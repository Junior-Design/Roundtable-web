import React from 'react';
import { Link } from 'react-router';
import { PlaylistTableItem } from '../components/playlist_table_item';

const imageStyle = {
  width: '75px',
  height: '75px',
  marginRight: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
}

function generatePlaylistItems() {
	let items = []
	for (let i = 0; i < 4; i++) {
		items.push((<PlaylistTableItem/>));
	}
	return items
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
  render() {
  	let playlistitems = generatePlaylistItems()
    return (
    	<table cellSpacing="0">
    	<tbody>
    		{ playlistitems }
    	</tbody>
    	</table>
    );
  }
}

