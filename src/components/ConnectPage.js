import React from 'react';
import { Link } from 'react-router';

import spotifyLogo from '../../images/spotify_logo.jpg';
import appleMusicLogo from '../../images/applemusic_logo.png';

const imageStyle = {
  width: '100px',
  height: '100px',
  marginRight: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
}
const linkStyle = {
  color: '#007000',
  textDecoration: 'none',
  fontWeight: 'bold'
}

export default class ConnectPage extends React.Component {
  render() {
    return (
      <div className="connect">
          <h2>Connect an external music streaming service</h2>
          <Link to={`/connect/spotify`} style={linkStyle}><img src={spotifyLogo} style={imageStyle} /><span>Connect Spotify account</span></Link>
          <br />
          <Link to={`/connect/applemusic`} style={linkStyle}><img src={appleMusicLogo} style={imageStyle} /><span>Connect Apple Music account</span></Link>
      </div>
    );
  }
}