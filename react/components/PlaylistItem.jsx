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
  alignItems: "center",
  width:"100%"
}


const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  whitespace: 'nowrap',
  margin: '9px 0',
  width: '100%',
  height: '75px'
}

const buttonStyle = {
  width: '50px',
  height: '50px',
  fontSize: '50px',
  color: 'white',
  border: 'none',
  marginLeft: "auto",
  background: 'none'
}

class SongButton extends React.Component {
  constructor(props) {
    super(props);
  }
}

function navigateToPlaylistSong() {
  window.location = '/login'
}

export default class PlaylistItem extends React.Component {
  
  constructor(props) {
    super(props)

    let name = props.playlist.name;
    if (name.length > 23)
      name = name.substring(0, 21) + "...";

    let image = this.props.playlist.image_url;
    if (!(props.playlist.image_url != undefined 
      && props.playlist.image_url != "")) {
      image = '/assets/images/music-placeholder.png';
    }

    this.state = {"name":name, "image":image, "owned":props.owned};
  }
  
  render() {
    let b = (<button style={buttonStyle}>+</button>);
    if (this.state.owned)
      b = null;

    return (
  		<li className="playlistItem" onClick={this.props.onClick} style={itemStyle}>
        <div style={rowStyle}>
          <div className="coverImage">
            <img src={this.state.image} style={imageStyle} />
          </div>
          <div>
            <div style={rowStyle}>
              {this.state.name}
            </div>
          </div>

          <div style={{marginLeft:"auto"}}>
            {b}
          </div>
        </div>
      </li>
    );
  }
}