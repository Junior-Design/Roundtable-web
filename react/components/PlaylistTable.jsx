import React from 'react';
import { Link } from 'react-router';
import { PlaylistTableRow } from '../components/PlaylistTableRow';

import comms from '../comms';

const imageStyle = {
  width: '75px',
  height: '75px',
  marginRight: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
}

export class PlaylistTable extends React.Component {

	componentWillMount() {
		this.state = {"playlists": []}

		let component = this
    comms.getPlaylists(function(playlists) {
      component.setState({"playlists": playlists})
    })
  }

  render() {
  	let playlistitems = this.state.playlists.map(function(playlist) {
  		return (<PlaylistTableRow playlist={playlist}/>)
  	})

    return (
    	<table cellSpacing="0">
    		{ playlistitems }
    	</table>
    );
  }
}

