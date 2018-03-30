import React from 'react';
import { Link } from 'react-router';
import PlaylistItem from '../components/PlaylistItem';

import comms from '../comms';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    this.loadUserPlaylists(id);
  }

  loadUserPlaylists(id) {
    comms.getUserPlaylists(id, (playlists) => {
      this.setState({"items": playlists, "playlist": 0})
    })
  }
  playListClicked(id) {
    console.log(id);
  }

  render() {
    let items = this.state.items.map((item) => {
        return (<PlaylistItem onClick={(e) => this.playlistClicked(item.id)} playlist={item} key={item.name}/>)
    })

    return (
      <ul style={{"padding":0, "listStyle":"none"}}>
    		{items}
    	</ul>
    );
  }
}