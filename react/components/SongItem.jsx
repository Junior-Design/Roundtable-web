import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';


const imageStyle = {
  width: '75px',
  height: '75px',
  marginRight: '10px',
  display: 'inline-block',
  verticalAlign: 'middle'
}

export default class SongItem extends React.Component {
  
  componentWillMount() {
    if (this.props.song.album_art_url != undefined 
      && this.props.song.album_art_url != "") 
    {
      this.state = {"image": this.props.song.album_art_url}
    } else {
      this.state = {"image": '/assets/images/music-placeholder.png'}
    }
  }
  
  render() {
    return (
  		<div className="songItem" style={{"marginBottom":"12px"}}>
        <span>
          <img src={this.state.image} style={imageStyle} />
        </span>
        <span style={{"fontSize": "1.25em", "marginRight":"15px"}}>{this.props.song.name}</span>
        <span style={{"fontSize": "0.75em"}}>{this.props.song.artist}</span>
      </div>
    );
  }
}