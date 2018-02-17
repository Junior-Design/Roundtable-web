import React from 'react';
import { Link } from 'react-router';
import { PlaylistTableItem } from '../components/playlist_table_item';

import comms from '../comms';

const imageStyle = {
  width: '75px',
  height: '75px',
  marginRight: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
}

function getPlaylistData() {
  //server.get('/spotify/', {}, function(resp) {
    //console.log(resp)
    //var spotifyAuthUrl = JSON.parse(resp.text)["authUrl"]
  //})
}

//we can replace ,a. with link later<Link onClick={this.connectToSpotifyClicked} style={linkStyle}><img src={`/assets/images/spotify_logo.jpg`} style={imageStyle} /><span>Connect Spotify account</span></Link>
//wordlimit needs to be put on description somehow
export class PlaylistTable1 extends React.Component {

	componentWillMount() {
		this.state = {"playlists": []}
		console.log(this.state)
		let component = this
    comms.getPlaylists(function(playlists) {
      console.log(playlists)
      component.setState({"playlists": playlists})
      console.log(component.state)
    })
  }

  render() {
  	console.log("attempting render")
  	let playlistitems = this.state.playlists.map(function(playlist) {
  		return (<PlaylistTableItem playlist={playlist}/>)
  	})

    return (
    	<table cellSpacing="0">
    	<tbody>
    		{ playlistitems }
    	</tbody>
    	</table>
    );
  }
}

