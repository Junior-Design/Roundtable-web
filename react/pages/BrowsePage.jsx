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
        <h2>Popular playlists</h2>
				<br/>
				<br/>
        <h2>Recommended for you</h2>
				<br/>
				<br/>
      </div>
    );
  }
}