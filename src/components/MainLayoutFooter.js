// src/components/MainLayoutFooter.js
import React from 'react';
import { Link } from 'react-router';

const footerStyle = {
  width: '100%',
  marginTop: '10px',
  borderTop: '1px solid black',
  padding: '10px 0'
}

export default class MainLayoutFooter extends React.Component {
  render() {
    return (
      <div className="mainLayoutFooter" style={footerStyle}>
        <p>Footer.</p>
      </div>
    );
  }
}