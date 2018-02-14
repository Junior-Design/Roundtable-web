import sys
import json
import os
import time

from flask import Flask, make_response

import global_vars
import google_play_endpoints
import spotify_endpoints

app = Flask(__name__)


PORT = 3000

# Flask `app` defined in /server/flask_app.py so it can be
# imported in other files without making circular dependencies

# Set up React routes
app.add_url_rule('/bundle.js', 'bundle', lambda: app.send_static_file('static/bundle.js'))

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return make_response('index.html')

# Spotify endpoints are in /server/spotify_endpoints.py
# Google Play Music endpoints are in /server/google_play_endpoints.py

if __name__ == '__main__':
    if '--https' in sys.argv:
        global_vars.protocol = 'https'
        app.run(port=int(os.environ.get("PORT", PORT)), debug=True, ssl_context=('server.crt', 'server.key'))
    else:
        app.run(port=int(os.environ.get("PORT", PORT)), debug=True)
