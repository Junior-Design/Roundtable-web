from flask import request, redirect, url_for
from flask_app import app

import global_vars
import model
import firebase

######################
# Firebase Endpoints #
######################

@app.route('/users', methods=['GET'])
def database_users():
    users_dict = firebase.get_data("users")
    
    users = []
    for (id, user) in users_dict.items():
        user = user.copy()
        # don't return all of the playlists as a part of this response
        user.pop('playlists', None)
        users.append(user)

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

@app.route('/users/<path:user_id>/playlists/<path:playlist_id>', methods=['GET'])
def user_playlist_songs(user_id, playlist_id):
    user_dict = firebase.get_data("users")
    user = user_dict[user_id]
    if user == None:
        return "{'error': 'could not find user with given id'}"
    
    playlist = list(filter(lambda playlist: playlist['id'] == playlist_id, user['playlists']))[0]
    if playlist == None:
       return "{'error': 'could not find playlist with given id'}"
    
    return model.to_json(playlist['songs'])

    return model.to_json(playlists)
