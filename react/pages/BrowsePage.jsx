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
        {/* <h2>Popular playlists</h2>
				<br/> */}
        <h2>Your playlists</h2>
        <br />
        <PlaylistTable />
				{/* <br/>
        <h2>Recommended for you</h2> */}
				<br/>
				<br/>
      </div>
    );
  }
}