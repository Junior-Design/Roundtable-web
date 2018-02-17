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
`;

export class PlaylistTableRow extends React.Component {
  render() {
    return (
  		<TableRow>
        <TableCell>
          <div className="icon"><img src={this.props.playlist.img_url} style={imageStyle} /></div>
        </TableCell>
        <TableCell>
          <p name="playlisttitle">{this.props.playlist.name}</p>
        </TableCell>
        <TableCell>
          <p name="description">{this.props.playlist.description}</p>
        </TableCell>
      </TableRow>
    );
  }
}