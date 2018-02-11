import json
import os
import time
from flask_app import app
import google_play_endpoints
import spotify_endpoints

# Flask `app` defined in /server/flask_app.py so it can be
# imported in other files without making circular dependencies

# Set up React routes
app.add_url_rule('/', 'root', lambda: app.send_static_file('static/index.html'))
app.add_url_rule('/bundle.js', 'bundle', lambda: app.send_static_file('static/bundle.js'))

# Spotify endpoints are in /server/spotify_endpoints.py
# Google Play Music endpoints are in /server/google_play_endpoints.py

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)), debug=True)
