import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import PlaylistItem from '../components/PlaylistItem';
import SongItem from '../components/SongItem';

import comms from '../comms';

const rightStyle = {
  textAlign: 'right'
}
const linkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class BrowsePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {"items" : [], "playlistId" : 0}
    this.loadUserPlaylists();
/*
    if (this.props.location.query.playlist) {
      console.log(this.props.location.query.playlist)
      comms.getPlaylistSongs(this.props.location.query.playlist, function(songs) {
        comp.setState({"items": songs, "playlist": false})
      })
    } else {
      comms.getPlaylists(function(playlists) {
        comp.setState({"items": playlists, "playlist": true})
      })
    }*/
    this.playlistClicked = this.playlistClicked.bind(this);
  }

  loadUserPlaylists() {
    comms.getPlaylists((playlists) => {
      this.setState({"items": playlists, "playlist": 0})
    })
  }

  playlistClicked(id) {
    window.location = "playlist?id=" + id;
  }

  render() {
  	let items = this.state.items.map((item) => {
        return (<PlaylistItem onClick={(e) => this.playlistClicked(item.id)} owned={true} playlist={item} key={item.name}/>)
    })
    
    return (
    	<ul style={{"padding":0, "listStyle":"none"}}>
    		{items}
    	</ul>
    );
  }
}