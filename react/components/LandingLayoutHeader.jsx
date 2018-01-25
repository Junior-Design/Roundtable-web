import React from 'react';
import { Link } from 'react-router';

const headerStyle = {
  width: '100%',
  marginBottom: '10px',
  borderBottom: '1px solid black',
  padding: '10px 0'
}
const headerLinkStyle = {
  color: 'black',
  textDecoration: 'none'
}
const linkStyle = {
  margin: '0 20px',
  color: '#dd0000',
  textDecoration: 'none'
}

export default class LandingLayoutHeader extends React.Component {
  render() {
    return (
      <div className="landingLayoutHeader" style={headerStyle}>
        <Link to={`/`} style={headerLinkStyle}><h1>Roundtable</h1></Link>
        <br />
      </div>
    );
  }
}