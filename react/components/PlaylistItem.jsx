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
  
  constructor(props) {
    super(props)

    if (props.playlist.image_url != undefined 
      && props.playlist.image_url != "") 
    {
      this.state = {"image": this.props.playlist.image_url}
    } else {
      this.state = {"image": '/assets/images/music-placeholder.png'}
    }
  }
  
  render() {
    return (
  		<li className="playlistItem" onClick={this.props.onClick} style={{"margin":"9px 0", "width":"100%", "height":"75px"}}>
        <span>
          <img src={this.state.image} style={imageStyle} />
        </span>
        <span style={{"fontSize": "25px"}}>{this.props.playlist.name}</span>
        <span>{this.props.playlist.description}</span>
      </li>
    );
  }
}