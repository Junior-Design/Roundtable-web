from flask import request, redirect, url_for
from flask_app import app

import global_vars
import model
import firebase
import spotify_endpoints

######################
# Firebase Endpoints #
######################

def user_id_of_current_user():
    if request.headers.get('spotify-token') != None:
        user = model.from_json(spotify_endpoints.spotify_user())
        if 'id' in user:
            return user['id']
        else:
            return None
    elif request.headers.get('google-play-username') != None:
        return request.headers.get('google-play-username')
    else:
        return None

@app.route('/users', methods=['GET'])
def database_users():
    users_dict = firebase.get_data("users")
    
    users = []
    for (id, user) in users_dict.items():
        user = user.copy()
        # don't return all of the playlists as a part of this response
        user.pop('playlists', None)
        users.append(user)
    
    # if there is a user logged in with this request, remove them from the list
    current_user_id = user_id_of_current_user()
    if current_user_id != None:
        users = list(filter(lambda user: user['id'] != current_user_id, users))
    
    return model.to_json(users)

@app.route('/users/<path:user_id>/playlists', methods=['GET'])
def user_playlists(user_id):
    user_dict = firebase.get_data("users")
    user = user_dict[user_id]
    if user == None:
        return "{'error': 'could not find user with given id'}"

    playlists = []
    for playlist in user['playlists']:
        playlist = playlist.copy()
        # don't return all of the songs as a part of this response
        playlist.pop('songs', None)
        playlists.append(playlist)

    return model.to_json(playlists)

@app.route('/users/<path:user_id>/playlists/<path:playlist_id>/meta', methods=['GET'])
def user_playlist(user_id, playlist_id):
    
    if user_id == "me":
        user_id = user_id_of_current_user()
    
    user_dict = firebase.get_data("users")
    user = user_dict[user_id]
    if user == None:
        return "{'error': 'could not find user with given id'}"
    
    playlist_matches = list(filter(lambda playlist: playlist['id'] == playlist_id, user['playlists']))
    if len(playlist_matches) == 0:
        return "{'error': 'could not find playlist with given id'}"

    return model.to_json(playlist_matches[0])

@app.route('/users/<path:user_id>/playlists/<path:playlist_id>', methods=['GET'])
def user_playlist_songs(user_id, playlist_id):
    playlist = model.from_json(user_playlist(user_id, playlist_id))
    if 'error' in playlist or playlist is None:
        return "{'error': 'could not load the given playlist'}"
    
    return model.to_json(playlist['songs'])
