// src/components/MainLayoutHeader.js
import React from 'react';
import { Link } from 'react-router';

const headerStyle = {
  width: '100%',
  marginBottom: '10px',
  borderBottom: '1px solid black',
  padding: '10px 0'
}
const linkStyle = {
  margin: '0 20px',
  color: '#dd0000',
  textDecoration: 'none'
}

export default class MainLayoutHeader extends React.Component {
  render() {
    return (
      <div className="mainLayoutHeader" style={headerStyle}>
        <h1>Roundtable</h1>
        <br />
        <Link to={`/browse`} style={linkStyle}>Browse</Link>
        <Link to={`/playlists`} style={linkStyle}>Playlists</Link>
      </div>
    );
  }
}