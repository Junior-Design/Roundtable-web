import request from 'superagent'

function user() {
  firebase.auth().currentUser
}

const server = {
  post(route, data, callback) {
    request.post(route)
      .type('json')
      .send(JSON.stringify({ data: data, user: user() }))
      .then(callback)
  },
  get(route, data, callback) {
    request.get(route)
      .type('json')
      .send(JSON.stringify({ data: data, user: user() }))
      .then(callback)
  }
}

export default server
