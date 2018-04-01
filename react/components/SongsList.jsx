import React from 'react';
import { Link } from 'react-router';
import SongItem from '../components/SongItem';

import comms from '../comms';

export default class SongsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {"items" : []}
    this.loadSongsInPlaylist(props.playlistId, props.userId);
  }

  loadSongsInPlaylist(id, userId) {
    if (userId) {
      comms.getUserPlaylistSongs(userId, id, (songs) => {
        this.setState({"items": songs})
      })
    } else {
      comms.getPlaylistSongs(id, (songs) => {
        this.setState({"items": songs})
      })
    }
  }

  render() {
  	let items = this.state.items.map((item) => {
      return (<SongItem onClick={(e) => this.props.songClicked(item.id)} song={item} key={item.name}/>)
    })
    
    return (
    	<ul style={{"padding":0, "listStyle":"none"}}>
    		{items}
    	</ul>
    );
  }
}