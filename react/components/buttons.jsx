import React from 'react';
import { Link } from 'react-router';

const libraryButtonStyle = {
  backgroundColor:"#44c767",
  borderRadius:"28px",
  border:"1px solid #18ab29",
  display:"inline-block",
  cursor:"pointer",
  color:"#ffffff",
  fontFamily:"Objektiv",
  fontSize:"14px",
  padding:"14px 18px",
  margin:"8px 0px 0px 0px",
  textDecoration:"none",
  textShadow:"0px 1px 0px #2f6627"
}

export class AddToLibraryButton extends React.Component {
  render() {
    return (
      <div style={libraryButtonStyle}>{this.props.children}</div>
    );
  }
}