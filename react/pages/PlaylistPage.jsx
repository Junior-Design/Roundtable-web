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

export default class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    let userId = this.props.location.query.userId
    this.state = {"id":id, "userId":userId ? userId, "owned": userId == null, "meta":{}, "loading":false}

    comms.getPlaylistMeta(userId, id, (meta) => {
      this.setState({"meta":meta});
    });
    
  }

  addButtonClick() {
    this.setState({"loading":true});
    comms.importPlaylist(this.state.userId ? this.state.userId : "me", this.state.id, (o) => {
      this.setState({"loading":false});
      if (o.status)
        this.setState({"owned":true});
    });
  }

  render() {
    let butt = null;
    if (this.state.owned == false)
      butt = (<AddToLibraryButton onClick={(e)=>this.addButtonClick()}/>)
    //if (this.state.loading)
      //butt = (<img src="spinner.gif"/>)

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
            {butt}
          </div>
        </div>
        <SongsList playlistId={this.state.id} userId={this.state.userId} songClicked={(id) => console.log(id)} />
      </div>
    );
  }
}