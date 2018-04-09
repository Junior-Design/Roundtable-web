import json

def from_json(response):
    try:
        return json.loads(response)
    except:
        return {}

def to_json(model_object):
    try:
        return json.dumps(model_object, indent=4, default=lambda x: x.__dict__)
    except:
        return ""

class User:
    def __init__(self, id=None, name=None, platform=None):
        self.id = id
        self.name = name
        self.platform = platform

    def for_google_play_username(username):
        return User(
            id=username,
            name=username,
            platform="Google Play")

    def from_spotify_response(response):
        return User(
            id=response['id'],
            name=response['display_name'],
            platform="Spotify")

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
        return Playlist(
            name=response['name'],
            description="", # doesn't seem to be vended from the Spotify API
            platform="Spotify",
            id=response['id'],
            owner_name=response['owner']['display_name'],
            image_url=(None if len(response['images']) == 0 else response['images'][0]['url']))


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
            track = response['track']
            return Song(
                name=track['title'],
                artist=track['artist'],
                album=track['album'],
                id=response['id'],
                album_art_url=track['albumArtRef'][len(track['albumArtRef']) - 1]['url'])

    def from_spotify_response(response):
        track = response['track']
        return Song(
            name=track['name'],
            artist=track['artists'][0]['name'],
            album=track['album']['name'],
            id=track['id'],
            album_art_url=track['album']['images'][0]['url'])

