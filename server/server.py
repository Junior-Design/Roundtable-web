import sys
import json
import os
import time
from flask_app import app
from flask import send_from_directory

import global_vars
import google_play_endpoints
import spotify_endpoints

PORT = 3000

# Flask `app` defined in /server/flask_app.py so it can be
# imported in other files without making circular dependencies

# Set up React routes
app.add_url_rule('/bundle.js', 'bundle', lambda: app.send_static_file('bundle.js'))

@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('../public/assets', path)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory('../public/static', 'index.html')

# Spotify endpoints are in /server/spotify_endpoints.py
# Google Play Music endpoints are in /server/google_play_endpoints.py

if __name__ == '__main__':
    if '--https' in sys.argv:
        global_vars.protocol = 'https'
        app.run(port=int(os.environ.get("PORT", PORT)), debug=True, ssl_context=('server.crt', 'server.key'))
    else:
        app.run(port=int(os.environ.get("PORT", PORT)), debug=True)
