from flask import request
from flask_app import app
import gmusicapi
import model

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
    return model.json(playlists)

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
            return client
        else:
            return None
