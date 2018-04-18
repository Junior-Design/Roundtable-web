from flask import request
from flask_app import app
import gmusicapi
import model
import firebase
import database_endpoints as database

# `gmusicapi` API Reference:
# https://unofficial-google-music-api.readthedocs.io/en/latest/

#################
# API Endpoints #
#################
# Google Play Music credentials need to be included in the http header of any requests to these endpoints.
#    - `google-play-username` and `google-play-password`

@app.route('/google-play/playlists', methods=['GET'])
def google_play_playlists():
    client = gmusicapi_client()
    playlists_response = client.get_all_playlists()
    playlists = list(map(model.Playlist.from_google_play_response, playlists_response))

    # also attach images to the playlists
    for playlist in playlists:
        if playlist.image_url == None:
            songs = model.from_json(google_play_playlist(playlist.id))
            if len(songs) > 0:
                playlist.image_url = songs[0]['album_art_url']

    return model.to_json(playlists)

@app.route('/google-play/playlists/<path:playlist_id>', methods=['GET'])
def google_play_playlist(playlist_id):
    client = gmusicapi_client()
    playlists_response = client.get_all_user_playlist_contents()

    for playlist in playlists_response:
        if playlist['id'] == playlist_id:
            songs = list(map(model.Song.from_google_play_response, playlist['tracks']))
            return model.to_json(songs)

    return model.to_json({"error": "Could not find playlist with id '" + str(playlist_id) + "'"})

@app.route('/google-play/save-to-firebase')
def save_google_play_data_to_firebase(username=None):
    return #disabled for now

    # save the user to our users database
    if username is None:
        username = request.headers.get('google-play-username')
    if username is None:
        return "{'error': 'no user specified'}"

    user = model.from_json(model.to_json(model.User.for_google_play_username(username)))

    # fetch and save all of the playlists
    playlists = model.from_json(google_play_playlists())

    for playlist in playlists:
        if 'error' in playlist:
            continue
        songs = model.from_json(google_play_playlist(playlist['id']))
        playlist['songs'] = songs

    user['playlists'] = playlists

    firebase.set_data("users/" + user['id'], user)
    print("Successfully wrote " + str(username) + "'s Google Play Music data to Firebase")
    return "{}"

@app.route('/google-play/import-playlist/<path:user_id>/<path:playlist_id>')
def import_playlist_to_google_play(user_id, playlist_id):
    playlist_owner = firebase.get_data("users/" + user_id)
    if playlist_owner is None or 'error' in playlist_owner:
        return "{'error': 'User could not be found.'}" 
    
    playlist = model.from_json(database.user_playlist(user_id, playlist_id))
    if playlist is None or 'error' in playlist or 'songs' not in playlist:
        return "{'error': 'Playlist could not be found.'}"
    
    username = request.headers.get('google-play-username')
    client = gmusicapi_client()
    
    # create the new playlist
    new_playlist_id = client.create_playlist(
        playlist['name'], 
        description="Imported from Roundtable. Originally created by " + playlist_owner['name'] + ".")
    
    source_playlist_songs = playlist['songs']
    
    if playlist_owner['platform'] == 'Google Play':
        # if importing from Google Play to Google Play, just use the source track IDs
        track_ids = list(map(lambda song: song['id'], source_playlist_songs))
    else:
        # if importing from a foreign platform, must search by song
        track_ids = list(map(search_for_google_play_song_id, source_playlist_songs))
        track_ids = list(filter(lambda song_id: song_id is not None, track_ids))
    
    # copy the songs into the new playlist
    client.add_songs_to_playlist(new_playlist_id, track_ids)
    return "Created playlist " + str(new_playlist_id)
    
    return model.to_json({'status': 'success'})

def search_for_google_play_song_id(song):
    q = str(song['artist']) + " - " + str(song['name'])
    if song['album'] is not None:
        q = q + " - " + str(song['album'])
    search_results = gmusicapi_client().search(q, max_results=2)
    first_song = search_results["song_hits"][0]
    return first_song["track"]["storeId"]

##########################
# gmusicapi Client Setup #
##########################

__existing_gmusicapi_client = None

def gmusicapi_client():
    global __existing_gmusicapi_client

    if __existing_gmusicapi_client is not None and __existing_gmusicapi_client.is_authenticated():
        return __existing_gmusicapi_client
    else:
        username = request.headers.get('google-play-username')
        password = request.headers.get('google-play-password')

        if username is None or password is None:
            # throw some exception? idk how we want to model exceptions, or if its worth our time at this point
            pass

        client = gmusicapi.Mobileclient()
        print(client.login(username, password, "01FCC8E1239A"))

        # ~CAL: this is a snippit that lets you authorize a specific device ID.
        # I already auth'd "01FCC8E1239A" for the dummy account i'm using,
        # so we won't have to use it again for now. This is a goddamn hack though, and
        # basically means it would be a lot of work to support any arbitrary google play account through the web client.
        # SOLUTION: always use the dummy account
        #
        #if not client.is_authenticated():
        #    print("Opening an oauth flow in your web brower...")
        #    account_manager = gmusicapi.clients.Musicmanager()
        #    account_manager.perform_oauth(open_browser=True)
        #    account_manager.login(uploader_id="01FCC8E1239A")
        #    return "try again?"

        if client.is_authenticated():
            __existing_gmusicapi_client = client

            # save the user to our users database
            save_google_play_data_to_firebase(username=username)

            return client
        else:
            return None
