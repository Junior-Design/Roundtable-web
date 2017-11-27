import React from 'react';
import { Link } from 'react-router';

const loginLinkStyle = {
  color: '#0000ff',
  textDecoration: 'none'
}

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="index">
        <br />
        <p><Link to={`/login`} style={loginLinkStyle}>Login</Link> or <Link to={`/register`} style={loginLinkStyle}>create an account</Link> to get started</p>
        <br />
      </div>
    );
  }
}