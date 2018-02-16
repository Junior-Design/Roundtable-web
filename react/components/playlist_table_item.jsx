import React from 'react';
import { Link } from 'react-router';

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

export class PlaylistTableItem extends React.Component {
  render() {
    return (
  		<tr>
			<td>
				<div className="icon"><img src={`/assets/images/applemusic_logo.png`} style={imageStyle} /></div>
			</td>
			<td>
				<p name="playlisttitle"> This is the playlist title    </p>
			</td>
			<td>
				<p name="description"> This is the description title</p>
			</td>
		</tr>
    );
  }
}