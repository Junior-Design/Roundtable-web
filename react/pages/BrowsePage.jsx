import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import { PlaylistItem } from '../components/PlaylistItem';
import { SongItem } from '../components/SongItem';

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
    this.state = {"items" : []}
    let comp = this

    if (this.props.location.query.playlist) {
      console.log(this.props.location.query.playlist)
      comms.getPlaylistSong(this.props.location.query.playlist, function(songs) {
        comp.setState({"items": songs, "playlist": false})
      })
    } else {
      comms.getPlaylists(function(playlists) {
        comp.setState({"items": playlists, "playlist": true})
      })
    }
  }

  playlistClicked(id) {
    window.location = '/browse?playlist=' + id
  }

  songClicked(id) {
    console.log(id)
  }

  /*
  componentDidMount() {
    let comp = this
    comms.getPlaylists(function(playlists) {
      //console.log(playlists)
      //comp.setState({"playlists": playlists})
    })
  }*/

  render() {
  	let items = this.state.items.map((item) => {
      if (!this.state.playlist)
        return (<SongItem onClick={(e) => this.songClicked(item.id)} song={item} key={item.name}/>)
      else
        return (<PlaylistItem onClick={(e) => this.playlistClicked(item.id)} playlist={item} key={item.name}/>)
    })
    
    return (
    	<ul style={{"padding":0, "listStyle":"none"}}>
    		{items}
    	</ul>
    );
  }
}