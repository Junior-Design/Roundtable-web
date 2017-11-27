import React from 'react';
import { Link } from 'react-router';

const rightStyle = {
  textAlign: 'right'
}
const linkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class BrowsePage extends React.Component {
  render() {
    return (
      <div className="browse">
        <div style={rightStyle}>
          <Link to={`/connect`} style={linkStyle}>Connect a music streaming service</Link>
        </div>
        <h2>Popular playlists</h2>
        <h2>Recommended for you</h2>
      </div>
    );
  }
}