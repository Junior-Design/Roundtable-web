import request from 'superagent'



const comms = {
  setCookie : function(name,value,expires) {
    var expires_t = "";
    if (expires) {
      var date = new Date();
      date.setTime(date.getTime() + (expires * 1000));
      expires_t = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires_t + "; path=/";
  },

  getCookie : function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },

  eraseCookie : function(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
  },

  post : function(route, data, callback) {
    let c = request.post(route)
      .type('json')

    for (let i = 0; i < headers.length; ++i) {
      c = c.set(headers[i][0], headers[i][1])
    }

    c = c.send(JSON.stringify({ data: data }))

    if (callback)
      c.then(callback)
  },

  get : function(route, data, callback) {
    let service = comms.getCookie('music-service')
    route = route.replace('{service}', service)
    
    let headers = []
    if (service == 'spotify') {
      headers = [["spotify-token", comms.getCookie('spotify-token')]]
    } else { // google-play
      headers = [
        ["google-play-username", comms.getCookie('google-play-username')],
        ["google-play-password", comms.getCookie('google-play-password')]]
    }
    
    let c = request.get(route)
      .type('json')

    for (let i = 0; i < headers.length; ++i) {
      c = c.set(headers[i][0], headers[i][1])
    }

    c = c.send(JSON.stringify({ data: data }))

    if (callback)
      c.then(function(response) {
        callback(JSON.parse(response.text))
      })
  },

  getPlaylists(callback) {
    comms.get('/{service}/playlists', {}, callback)
  },

  getPlaylistSongs(playlistId, callback) {
    let route = '/{service}/playlists/' + playlistId
    comms.get(route, {}, callback)
  }
  
}

export default comms
