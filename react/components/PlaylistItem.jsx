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

const TableRow = styled.tr`
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TableCell = styled.td`
  padding-right: 10px;
  padding-bottom: 10px;
`;

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
  		<div className="playlistItem">
        <div>
          <div className="icon"><img src={this.state.image} style={imageStyle} /></div>
        </div>
        <div>
          <p name="playlisttitle" style={{"fontSize": "25px"}}>{this.props.playlist.name}</p>
        </div>
        <div>
          <p name="description">{this.props.playlist.description}</p>
        </div>
      </div>
    );
  }
}