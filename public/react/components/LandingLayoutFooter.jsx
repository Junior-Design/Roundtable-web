import React from 'react';
import { Link } from 'react-router';

const footerStyle = {
  width: '100%',
  marginTop: '10px',
  borderTop: '3px solid #B49594',
  padding: '10px 0'
}

export default class MainLayoutFooter extends React.Component {
  render() {
    return (
      <div className="mainLayoutFooter" style={footerStyle}>
        <p>FooterTempText.</p>
      </div>
    );
  }
}