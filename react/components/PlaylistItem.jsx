import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import comms from '../comms';

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
  color: 'white',
  border: 'none',
  marginRight: "10px",
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

    let userId = props.userId;
    let name = props.playlist.name;
    if (name.length > 23)
      name = name.substring(0, 21) + "...";

    let image = this.props.playlist.image_url;
    if (!(props.playlist.image_url != undefined 
      && props.playlist.image_url != "")) {
      image = '/assets/images/music-placeholder.png';
    }

    this.state = {"name":name, "image":image, "owned":userId ? false : true, "loading":false};
  }

  addButtonClick() {
    this.setState({"loading":true});
    comms.importPlaylist(this.props.userId, this.props.playlist.id, (o) => {
      this.setState({"loading":false});
      if (o.status)
        this.setState({"owned":true});
    });
  }
  
  render() {
    let ownButton = null;

    if (!this.state.owned)
      ownButton = (<button style={buttonStyle} onClick={(e)=>this.addButtonClick()}><span style={{fontSize:"40px"}}>+</span></button>);
    if (this.state.owned && this.props.userId != null)
      ownButton = (<button style={buttonStyle}><span style={{fontSize:"30px"}}>✓</span></button>)

    if (this.state.loading)
      ownButton = (<img src="/assets/images/spinner.gif" width="40px" height="40px"/>)

    return (
  		<li className="playlistItem" style={itemStyle}>
        <div style={rowStyle}>
          <div className="coverImage" onClick={this.props.onClick}>
            <img src={this.state.image} style={imageStyle} />
          </div>
          <div onClick={this.props.onClick}>
            <div style={rowStyle}>
              {this.state.name}
            </div>
          </div>

          <div style={{marginLeft:"auto", marginRight:"10px", width:"50px", height:"50px"}}>
            {ownButton}
          </div>
        </div>
      </li>
    );
  }
}