from flask import request, redirect, url_for
from flask_app import app

import global_vars
import model
import spotify
import firebase

# `spotify` API Reference:
# https://github.com/steinitzu/spotify-api

#################
# API Endpoints #
#################
# Spotify Auth Token must be included in the http header of any requests to these endpoints.
#    - `spotify-token`

@app.route('/spotify/user', methods=['GET'])
def spotify_user():
    client = spotify_client()
    me_response = client.me()
    user = model.User.from_spotify_response(me_response)
    return model.to_json(user)

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
    # max `limit` is 100 songs -- we would have to handle paging to get ~all~ of the songs.
    songs_response = client.user_playlist_tracks(user['id'], playlist_id, limit=100)
    songs = list(map(model.Song.from_spotify_response, songs_response["items"]))
    return model.to_json(songs)

@app.route('/spotify/save-to-firebase')
def save_spotify_data_to_firebase():
    # save the user to our users database
    user = model.from_json(spotify_user())
    
    # fetch and save all of the playlists
    playlists = model.from_json(spotify_playlists())
    
    for playlist in playlists:
        songs = model.from_json(spotify_playlist(playlist['id']))
        playlist['songs'] = songs
    
    user['playlists'] = playlists
    
    firebase.set_data("users/" + user['id'], user)
    return "{}"

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
        scopes=['user-read-private', 'user-top-read'])

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

