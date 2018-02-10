import json as json_encoder

def json(model_object):
    return json_encoder.dumps(model_object, indent=4, default=lambda x: x.__dict__)


class Playlist:
    def __init__(self, name=None, description=None, platform=None, id=None, owner_name=None):
        self.name = name
        self.description = description
        self.platform = platform
        self.id = id
        self.ownerName = owner_name

    def from_google_play_response(response):
        return Playlist(
            name=response['name'],
            description=response['description'],
            platform='Google Play',
            id=response['id'],
            owner_name=response['ownerName'])

