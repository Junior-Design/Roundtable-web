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
            description="", # doesn't seem to be vended from the Spotify API
            platform="Spotify",
            id=response['id'],
            owner_name=response['owner']['display_name'],
            image_url=response['images'][0]['url'])


class Song:
    def __init__(self, name=None, artist=None, album=None, id=None, album_art_url=None):
        self.name = name
        self.artist = artist
        self.album = album
        self.id = id
        self.album_art_url = album_art_url

    def from_google_play_response(response):
        if response['source'] == '1': #  `1` means "uploaded by user", so there is no metadata
            return Song(name="Unknown Song", artist="Unknown Artist")
        else:
            return Song(
                name=response['track']['title'],
                artist=response['track']['artist'],
                album=response['track']['album'],
                id=response['id'],
                album_art_url=response['track']['albumArtRef'][0]['url'])

    def from_spotify_response(response):
        return Song(
            name="",
            artist="",
            album="",
            id="",
            album_art_url="")

