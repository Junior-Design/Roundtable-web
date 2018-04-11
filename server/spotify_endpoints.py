from flask import request, redirect, url_for
from flask_app import app

import global_vars
import model
import spotify
import firebase
import database_endpoints as database

# `spotify` API Reference:
# https://github.com/steinitzu/spotify-api

#################
# API Endpoints #
#################
# Spotify Auth Token must be included in the http header of any requests to these endpoints.
#    - `spotify-token`

@app.route('/spotify/user', methods=['GET'])
def spotify_user():
    try:
        client = spotify_client()
        me_response = client.me()
        user = model.User.from_spotify_response(me_response)
        return model.to_json(user)
    except:
        return "{'error': 'Could not fetch information about the current user. The current token may not be valid.'}"

@app.route('/spotify/playlists', methods=['GET'])
def spotify_playlists():
    client = spotify_client()
    playlists_response = client.me_playlists()
    playlists = list(map(model.Playlist.from_spotify_response, playlists_response["items"])) # only returns the first 100 tracks
    return model.to_json(playlists) # still needs to be parsed into the Song model

@app.route('/spotify/playlists/<path:playlist_id>', methods=['GET'])
def spotify_playlist(playlist_id):
    client = spotify_client()
    user = model.from_json(spotify_user())

    try:
        # max `limit` is 100 songs -- we would have to handle paging to get ~all~ of the songs.
        songs_response = client.user_playlist_tracks(user['id'], playlist_id, limit=100)
        songs = list(map(model.Song.from_spotify_response, songs_response["items"]))
        return model.to_json(songs)
    except:
        return "{'error': 'Could not fetch playlist. It may not be owned by the user (e.g. subscribed playlist)'}"

@app.route('/spotify/save-to-firebase')
def save_spotify_data_to_firebase():
    # save the user to our users database
    user = model.from_json(spotify_user())

    # fetch and save all of the playlists
    playlists = model.from_json(spotify_playlists())

    for playlist in playlists:
        if 'error' in playlist:
            continue
        songs = model.from_json(spotify_playlist(playlist['id']))
        playlist['songs'] = songs

    user['playlists'] = playlists

    firebase.set_data("users/" + user['id'], user)
    return "{}"

@app.route('/spotify/import-playlist/<path:user_id>/<path:playlist_id>')
def import_spotify_playlist_to_spotify(user_id, playlist_id):
    playlist_owner = firebase.get_data("users/" + user_id)
    if playlist_owner is None or 'error' in playlist_owner:
        return "{'error': 'User could not be found.'}" 
    
    playlist = model.from_json(database.user_playlist(user_id, playlist_id))
    if playlist is None or 'error' in playlist or 'songs' not in playlist:
        return "{'error': 'Playlist could not be found.'}"
    
    current_user = model.from_json(spotify_user())
    client = spotify_client()
    
    # create the new playlist
    response = client.user_playlist_create(
        current_user['id'], 
        playlist['name'], 
        description="Imported from Roundtable. Originally created by " + playlist_owner['name'] + ".")
    
    source_playlist_songs = playlist['songs']
    
    if playlist_owner['platform'] == 'Spotify':
        # if importing from Spotify to Spotify, just use the source track IDs
        track_uris = list(map(lambda song: "spotify:track:" + song['id'], source_playlist_songs))
    else:
        # if importing from a foreign platform, must search by song
        track_uris = list(map(search_for_spotify_song_id, source_playlist_songs))
        track_uris = list(filter(lambda song_id: song_id is not None, track_uris))
    
    # copy the songs into the new playlist
    new_playlist_id = response['id']
    client.user_playlist_tracks_add(current_user['id'], new_playlist_id, track_uris)
    
    return "Success!"
    
def search_for_spotify_song_id(song):
    try:
        q = "track:" + str(song['name']) + " artist:" + str(song['artist']) + " album:" + str(song['album'])
        search_results = spotify_client().search(q, 'track', limit=2)
        first_track = search_results['tracks']['items'][0]
        return "spotify:track:" + str(first_track['id'])
    except:
        return None

#####################
# Spotify auth flow #
#####################
# (1) client calls `/spotify/auth` and redirects to the value for `authUrl`
# (2) Spotify redirects to the `/confirm/spotify/` server endpoint
#      - they give us some code, which we swap out (cryptographically?) for an OAuth token
# (3) We redirect the client to `/confirm/spotify/?token={OAUTH-TOKEN-HERE}`
#      - the client should store this token as a cookie so it can be pulled for any requests later
# (4) When the client calls any of our other endpoints, they need to use that token in their header
#      - `spotify-token` http header (value should be the token we give back)
#      - NOTABLY, this token expires after an hour. We're gonna want to make sure the cookie expires after an hour, too.

global_token = None # hack hack hack

@app.route('/spotify/auth', methods=['GET'])
def spotify_auth():
    authorize_url = spotify_oauth().authorize_url
    return model.to_json({"authUrl" : authorize_url})

@app.route('/spotify/auth/callback', methods=['GET'])
def spotify_auth_callback():
    oauth = spotify_oauth()
    oauth.request_token(request.url)
    token = oauth.token

    global global_token
    global_token = token['access_token']
    save_spotify_data_to_firebase()
    global_token = None

    return redirect("/login?token=" + token['access_token'] + "&expires_in=" + str(token['expires_in']))

def spotify_oauth():
    return spotify.OAuth(
        '1bfb013a55474809b040bd6934ff7ee5',
        '53eb0eba01dd44aebaa0414d550b2aaa',
        redirect_uri=(global_vars.protocol + '://localhost:3000/spotify/auth/callback'),
        scopes=['user-read-private', 
                'user-top-read', 
                'playlist-read-private', 
                'playlist-modify-private', 
                'playlist-modify-public', 
                'user-library-modify',
                'playlist-read-collaborative'])

def spotify_client():
    oauth = spotify_oauth()

    # this is a hack but it works
    # (supposed to be the same token object returned by `oauth.request_token` but python can't tell the difference)
    global global_token
    if global_token == None:
        user_provided_token = request.headers.get("spotify-token")
        oauth.token = {'access_token': user_provided_token}
    else:
        oauth.token = {'access_token': global_token}

    return spotify.Client(oauth).api
