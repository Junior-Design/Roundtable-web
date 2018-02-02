import React from 'react';
import { Link } from 'react-router';

const footerStyle = {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '60px',
  textAlign: 'center',
  backgroundColor: '#202020'
}

const wrapperStyle = {
  margin: 'auto'
}

const buttonStyle = {
  height: "100%",
  backgroundColor: "#202020",
  color: "white",
  margin: "0 10px"
}

export default class MainLayoutFooter extends React.Component {
  render() {
    return (
        <div className="mainLayoutFooter" style={footerStyle}>

          <Link to={`/browse`}><button style={buttonStyle}>Home</button></Link>
          <Link to={`/playlists`}><button style={buttonStyle}>Playlists</button></Link>
          <Link to={'/friends'}><button style={buttonStyle}>Friends</button></Link>

        </div>
    );
  }
}