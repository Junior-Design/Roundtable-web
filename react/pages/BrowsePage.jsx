import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import { PlaylistTable1 } from '../components/playlist_table';

import comms from '../comms';

const rightStyle = {
  textAlign: 'right'
}
const linkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class BrowsePage extends React.Component {

  componentDidMount() {
    comms.getPlaylists(function(resp) {
      console.log(resp)
    })
  }

  render() {
    return (
      <div className="browse">
        <h2>Popular playlists</h2>
				<br/>
        <PlaylistTable1/>
				<br/>
        <h2>Recommended for you</h2>
				<br/>
				<br/>
      </div>
    );
  }
}