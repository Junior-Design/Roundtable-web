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
				<div className="icon"><img src={this.props.playlist.img_url} style={imageStyle} /></div>
			</td>
			<td>
				<p name="playlisttitle"> {this.props.playlist.name}</p>
			</td>
			<td>
				<p name="description"> {this.props.playlist.description}</p>
			</td>
		</tr>
    );
  }
}