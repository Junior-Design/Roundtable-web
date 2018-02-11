from flask import request, redirect, url_for
from flask_app import app
import model 
import spotify

# `spotify` API Reference:
# https://github.com/steinitzu/spotify-api

@app.route('/spotify/playlists', methods=['GET'])
def spotify_playlists():
    client = spotify_client()
    playlists_response = client.me_playlists()
    playlists = list(map(model.Playlist.from_spotify_response, playlists_response["items"]))
    return model.to_json(playlists)

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

@app.route('/spotify/auth', methods=['GET'])
def spotify_auth():
    authorize_url = spotify_oauth().authorize_url
    return model.json({"authUrl" : authorize_url})

@app.route('/spotify/auth/callback', methods=['GET'])
def spotify_auth_callback():
    oauth = spotify_oauth()
    oauth.request_token(request.url)
    token = oauth.token
    print(token)
    return redirect("/confirm/spotify/?token=" + token['access_token'] + "&expires_in=" + str(token['expires_in']))

def spotify_oauth():
    return spotify.OAuth(
        '1bfb013a55474809b040bd6934ff7ee5',
        '53eb0eba01dd44aebaa0414d550b2aaa',
        redirect_uri='http://localhost:3000/spotify/auth/callback',
        scopes=['user-read-private', 'user-top-read'])

def spotify_client():
    user_provided_token = request.headers.get("spotify-token")
    oauth = spotify_oauth()
    
    # this is a hack but it works
    # (supposed to be the same token object returned by `oauth.request_token` but python can't tell the difference)
    oauth.token = {'access_token': user_provided_token}
    
    return spotify.Client(oauth).api

