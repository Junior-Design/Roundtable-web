import React from 'react'
import { Link } from 'react-router'
import server from '../server_requests'



function connectToSpotify() {
  server.get('/spotify/auth', {}, function(resp) {
    console.log(resp)
    var spotifyAuthUrl = JSON.parse(resp.text)["authUrl"]
    window.location = spotifyAuthUrl // redirect
  })
}

function connectToGooglePlay() {
  window.alert('Google Play not supported yet!')
  // TODO
}



const serviceLoginButtonStyle = {
  backgroundColor: '#4CAF50', // Green
  border: 'none',
  color: 'white',
  margin: '10px auto',
  textAlign: 'center',
  fontSize: '16px',
  width: '300px',
  height: '60px',
  borderRadius: '5px',
  display: 'block'
}

class ServiceLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <button onClick={this.props.handler} style={serviceLoginButtonStyle}>
          {this.props.name}
        </button>
    );
  }
}



const containerStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/assets/images/blur.jpg")',
  backgroundSize: '100% 100%',
  fontFamily: 'Rodina',
  color: 'white'
}

const logoHeaderStyle = {
  width: '100%',
  textAlign: 'center',
  height: '400px',
}

const logoStyle = {
  lineHeight: '400px',
  fontSize: '50px'
}

const serviceLoginGroupStyle = {
  width: '100%',
  textAlign: 'center'
}

export default class IndexPage extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={logoHeaderStyle}>
        <span style={logoStyle}>roundtable</span>
        </div>
        <div style={serviceLoginGroupStyle}>
          <ServiceLoginButton name="Spotify" handler={connectToSpotify} />
          <ServiceLoginButton name="Google Play" handler={connectToGooglePlay} />
        </div>
      </div>
    );
  }
}
