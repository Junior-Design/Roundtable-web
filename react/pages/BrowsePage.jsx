import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import { PlaylistTable } from '../components/PlaylistTable';

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
    comms.getPlaylists(function(playlists) {
      console.log(playlists)
    })
  }

  render() {
    return (
      <div className="browse">
        <h1>Your playlists</h1>
        <PlaylistTable />
				<br/>
				<br/>
      </div>
    );
  }
}