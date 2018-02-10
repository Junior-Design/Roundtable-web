from flask import Flask

app = Flask(__name__, static_url_path='', static_folder='public')

# Set up React routes
app.add_url_rule('/', 'root', lambda: app.send_static_file('static/index.html'))
app.add_url_rule('/bundle.js', 'bundle', lambda: app.send_static_file('static/bundle.js'))
