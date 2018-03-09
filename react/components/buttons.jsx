import React from 'react';
import { Link } from 'react-router';

const button1Style = {
  backgroundColor:"#44c767",
  borderRadius:"28px",
  border:"1px solid #18ab29",
  display:"inline-block",
  cursor:"pointer",
  color:"#ffffff",
  fontFamily:"Objektiv",
  fontSize:"17px",
  padding:"14px 18px",
  textDecoration:"none",
  textShadow:"0px 1px 0px #2f6627"
}

export class Button1 extends React.Component {
  render() {
    return (
      <span style={button1Style}>{this.props.children}</span>
    );
  }
}