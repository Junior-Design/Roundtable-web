import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';


const imageStyle = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
}

const rowStyle = {
  display: "flex",
  alignItems: "center"
}

export default class SongItem extends React.Component {
  
  constructor(props) {
    super(props);

    let name = props.song.name;
    if (name.length > 30)
      name = name.substring(0, 27) + "...";


      let image = props.song.album_art_url;
      if (!(image != undefined && image != "")) {
        image = '/assets/images/music-placeholder.png';
      }
  
      this.state = {"name":name, "image":image};
  }
  
  render() {
    return (
  		<div className="songItem" style={{"marginBottom":"12px"}}>
        <div style={rowStyle}>
          <div className="coverImg">
            <img src={this.state.image} style={imageStyle} />
          </div>
          <div>
            <div style={rowStyle}>
              <div style={{"fontSize": "15px"}}>{this.state.name}</div>
            </div>
            <div style={rowStyle}>
              <div style={{"fontSize": "10px"}}>{this.props.song.artist}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}