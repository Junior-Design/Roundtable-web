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

export class PlaylistItem extends React.Component {
  
  componentWillMount() {
    if (this.props.playlist.image_url != undefined 
      && this.props.playlist.image_url != "") 
    {
      this.state = {"image": this.props.playlist.image_url}
    } else {
      this.state = {"image": '/assets/images/music-placeholder.png'}
    }
  }
  
  render() {
    return (
  		<div className="playlistItem" style={{"marginBottom":"12px"}}>
        <span>
          <img src={this.state.image} style={imageStyle} />
        </span>
        <span style={{"fontSize": "25px"}}>{this.props.playlist.name}</span>
        <span>{this.props.playlist.description}</span>
      </div>
    );
  }
}