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
    return "hello"
