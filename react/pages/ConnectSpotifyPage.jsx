import React from 'react';
import { Link } from 'react-router';

const formStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#202020',
  color: 'white'
}

export default class ConnectSpotifyPage extends React.Component {
  render() {
    return (
      <div className="connectSpotify">
        <h2>Login to Spotify</h2>
        <br />
        <form action="/browse" style={formStyle}>
        Spotify Username: <input type="text" /><br /><br />
        Password: <input type="password" /><br /><br />
        <input type="submit" value="Login" /><br /><br />
        </form>
      </div>
    );
  }
}