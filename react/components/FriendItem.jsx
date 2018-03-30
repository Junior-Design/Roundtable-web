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
  
  componentWillMount() {
    if (this.props.friend.id != undefined && this.props.friend.name!= "") {
      this.state = {"friend": this.props.friend.name}
    } else {
      this.state = {"friend": 'no friend found'}
    }
  }
  
  render() {
    return (
  		<div className="FriendItem" style={{"marginBottom":"12px"}}>
        </span>
        <span style={{"fontSize": "1.25em", "marginRight":"15px"}}>{this.props.friend.name</span>
      </div>
    );
  }
}