import React from 'react';
import { Link } from 'react-router';
import SongsList from '../components/SongsList';

export default class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    let userId = this.props.location.query.userId
    this.state = {"id":id, "userId":userId}
    
  }

  songClicked(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <SongsList playlistId={this.state.id} userId={this.state.userId} songClicked={(id) => console.log(id)} />
      </div>
    );
  }
}