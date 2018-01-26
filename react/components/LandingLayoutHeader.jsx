import React from 'react';
import { Link } from 'react-router';

const headerStyle = {
  width: '100%',
  marginBottom: '10px',
  borderBottom: '3px solid #B49594',
  padding: '10px 0'
}
const headerLinkStyle = {
  color: '#BCABAE',
  textDecoration: 'none'
}
const linkStyle = {
  margin: '0 20px',
  color: '#dd0000',
  textDecoration: 'none'
}

const loginLinkStyle = {
  color: '#F2EEEA',
  textDecoration: 'none'
}

const headerLayoutLeftStyle = {
  width: '49%',
  fontSize: '2em',
  fontWeight: 'bold'
}

const headerLayoutRightStyle = {
  width: '49%',
  float: 'right',
  lineHeight: '2em',
  textAlign: 'right'
}

export default class LandingLayoutHeader extends React.Component {
  render() {
    return (
      <div className="landingLayoutHeader" style={headerStyle}>
        <div style={headerLayoutRightStyle}>
          <Link to={`/login`} style={loginLinkStyle}>Login</Link> or <Link to={`/register`} style={loginLinkStyle}>create an account</Link>
        </div>
        <div style={headerLayoutLeftStyle}>
          <Link to={`/`} style={headerLinkStyle}>roundtable</Link>
        </div>
      </div>
    );
  }
}