import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';

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
          <Link to={`/connect`} style={linkStyle}> <Button1>Connect a music streaming service</Button1> </Link>
        </div>
        <h2>Popular playlists</h2>
        <h2>Recommended for you</h2>
        <br />
        <br />
        <br />
        <br />
        <Link to={`/testapi`} style={linkStyle}>Temp, test server api</Link>
      </div>
    );
  }
}