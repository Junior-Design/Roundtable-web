import React from 'react';
import { Link } from 'react-router';
import { Button1 } from '../components/buttons';
import { SongList } from '../components/SongList';

import comms from '../comms';

const rightStyle = {
  textAlign: 'right'
}
const linkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class SongsPage extends React.Component {

    constructor(props) {
        super(props)

        comms.getSongs(props.playlistId, function(songs) {
            console.log(songs)
            comp.setState({"songs": songs})
        })
    }
    
    render() {
        let songs = this.state.songs.map(function(song) {
            return (<SongItem song={song} key={song.name}/>)
        })

    return (
        <div className="songItem">
            { songs }
        </div>);
    }
}