from flask import request
from flask_app import app
import model 
import spotify

@app.route('/spotify/auth', methods=['GET'])
def auth():
    authorize_url = spotify_client().authorize_url
    return model.json({"authUrl" : authorize_url})


def spotify_client():
    user_provided_token = request.headers.get("spotify-token")
    
    auth = spotify.OAuth(
        '1bfb013a55474809b040bd6934ff7ee5',
        '53eb0eba01dd44aebaa0414d550b2aaa',
        redirect_uri='http://localhost:3000/confirm/spotify',
        scopes=['user-read-private', 'user-top-read'])
    auth.token = user_provided_token
    return auth

