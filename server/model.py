import json

def from_json(response):
    return json.loads(response)

def to_json(model_object):
    return json.dumps(model_object, indent=4, default=lambda x: x.__dict__)


class Playlist:
    def __init__(self, name=None, description=None, platform=None, id=None, owner_name=None, image_url=None):
        self.name = name
        self.description = description
        self.platform = platform
        self.id = id
        self.ownerName = owner_name
        self.image_url = image_url

    def from_google_play_response(response):
        return Playlist(
            name=response['name'],
            description=response['description'],
            platform="Google Play",
            id=response['id'],
            owner_name=response['ownerName'])

    def from_spotify_response(response):
        print(response)
        return Playlist(
            name=response['name'],
            description="Google Play has playlist descriptions, but Spotify might not. TODO.", #TODO
            platform="Spotify",
            id=response['id'],
            owner_name=response['owner']['display_name'],
            image_url=response['images'][0]['url'])

