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
    users = list(map(lambda item: item[1], users_dict.items()))
    return model.to_json(users)
