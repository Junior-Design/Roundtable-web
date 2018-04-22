import React from 'react';
import { Link } from 'react-router';
import SongsList from '../components/SongsList';
import { AddToLibraryButton } from '../components/buttons';

import comms from '../comms';

const rowStyle = {
  display: "flex",
  alignItems: "center"
}

const rootStyle = {
  display: "flex",
  alignItems: "center",
  height:"80px",
  borderBottom:"1px grey solid",
  marginRight:"30px"
}

const buttonStyle = {
  width: '50px',
  height: '50px',
  color: 'white',
  border: 'none',
  marginLeft:"auto",
  marginRight: "10px",
  background: 'none'
}

export default class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    let userId = this.props.location.query.userId
    this.state = {"id":id, "userId":userId, "owned": userId == null, "meta":{}, "loading":false}

    comms.getPlaylistMeta(userId ? this.state.userId : "me", id, (meta) => {
      this.setState({"meta":meta});
    });
    
  }

  addButtonClick() {
    this.setState({"loading":true});
    comms.importPlaylist(this.state.userId, this.state.id, (o) => {
      this.setState({"loading":false, "owned":true});
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
      <div>
        <div>
          <div style={rootStyle}>
            <div>
              <div style={rowStyle}>
                <div style={{"fontSize": "18px"}}>{this.state.meta.name}</div>
              </div>
              <div style={rowStyle}>
                <div style={{"fontSize": "13px"}}>{this.state.meta.ownerName}</div>
              </div>
            </div>
            {ownButton}
          </div>
        </div>
        <SongsList playlistId={this.state.id} userId={this.state.userId} songClicked={(id) => console.log(id)} />
      </div>
    );
  }
}