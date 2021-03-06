import React from 'react';
import { Link } from 'react-router';
import PlaylistItem from '../components/PlaylistItem';

import comms from '../comms';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    this.state = {"userId":id, "items":[]}
    this.loadUserPlaylists(id);
  }

  loadUserPlaylists(id) {
    comms.getUserPlaylists(id, (playlists) => {
      this.setState({"items": playlists, "playlist": 0})
    })
  }
  playlistClicked(id) {
    window.location = "playlist?id=" + id + "&userId=" + this.state.userId;
  }

  render() {
    let items = this.state.items.map((item) => {
        return (<PlaylistItem onClick={(e) => this.playlistClicked(item.id)} userId={this.state.userId} playlist={item} key={item.id}/>)
    })

    return (
      <ul style={{"padding":0, "listStyle":"none"}}>
    		{items}
    	</ul>
    );
  }
}