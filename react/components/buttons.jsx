import React from 'react';
import { Link } from 'react-router';

const libraryButtonStyle = {
  backgroundColor:"#44c767",
  borderRadius:"28px",
  border:"1px solid #18ab29",
  display:"inline-block",
  float:"right",
  cursor:"pointer",
  color:"#ffffff",
  fontFamily:"Objektiv",
  fontSize:"10px",
  padding:"14px 18px",
  margin:"8px 8px 0px 0px",
  textDecoration:"none",
  textShadow:"0px 1px 0px #2f6627"
}

export class AddToLibraryButton extends React.Component {

  addButtonClick() {
    this.props.onClick()
  }

  render() {
    return (
      <div style={libraryButtonStyle} onClick={(e)=>this.addButtonClick()}>{this.props.children}</div>
    );
  }
}