import request from 'superagent'



const comms = {
  setCookie : function(name,value,expires) {
    var expires_t = "";
    if (expires) {
        var date = new Date();
        date.setTime(date.getTime() + expires);
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
      .send(JSON.stringify({ data: data }))

    if (callback)
      c.then(callback)
  },
  get : function(route, data, callback) {
    let c = request.get(route)
      .type('json')
      .send(JSON.stringify({ data: data }))

    if (callback)
      c.then(callback)
  },
  getPlaylists(callback) {
    let service = comms.getCookie('service')
    comms.get('/' + service + '/playlists', {}, callback)
  }
}

export default comms
