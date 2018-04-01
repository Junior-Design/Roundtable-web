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

export class FriendItem extends React.Component {
  
  constructor(props) {
    super(props)

    if (this.props.friend.id != undefined && this.props.friend.name!= "") {
      this.state = {"name": this.props.friend.name, "id": this.props.friend.id }
    } else {
      this.state = {"friend": 'no friend found'}
    }
  }

  onClick() {
    this.props.onClick(this.state.id);
  }
  
  render() {
    return (
  		<div onClick={(e) => this.onClick()} className="FriendItem" style={{"marginBottom":"12px"}}>
        <span style={{"fontSize": "1.25em", "marginRight":"15px"}}>{this.state.name}</span>
      </div>
    );
  }
}