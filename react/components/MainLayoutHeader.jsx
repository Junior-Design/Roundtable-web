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



//logout link is shown in main header depending on wheather a currentUser is logged in
export default class MainLayoutHeader extends React.Component {
  render() {
    return (
      <div className="mainLayoutHeader" style={headerStyle}>
        <Link to={`/`} style={headerLinkStyle}><h1>Roundtable</h1></Link>
        <br />
    
        { firebase.auth().currentUser ? <Link to={`/logout`} style={linkStyle}>Logout</Link> : null }
      </div>
    );
  }
}