import React from 'react';
import { Link } from 'react-router';
import SongsList from '../components/SongsList';

export default class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.location.query.id
    this.state = {"id":id}
    
  }

  songClicked(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        <SongsList playlistId={this.state.id} songClicked={(id) => console.log(id)} />
      </div>
    );
  }
}