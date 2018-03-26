import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


def setup_firebase():
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('./serviceAccountKey.json')

    # Initialize the app with a service account, granting admin privileges
    app = firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://roundtable-48b21.firebaseio.com'
    })

    # As an admin, the app has access to read and write all data, regradless of Security Rules
    return db.reference('')

ref = setup_firebase()

def get_data(resource_path):
    if resource_path == None or resource_path == '':
        return ref.get()
    return ref.child(resource_path).get()

def update_data(resource_path, data):
    if resource_path == None or resource_path == '':
        return ref.update(data)
    ref.child(resource_path).update(data)

def set_data(resource_path, data):
    if resource_path == None or resource_path == '':
        return ref.set(data)
    ref.child(resource_path).set(data)
