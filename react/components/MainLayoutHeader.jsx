import React from 'react';
import { Link } from 'react-router';

const headerStyle = {
  width: '100%',
  height: '50px',
  borderBottom: '1px solid white'
}
const headerLinkStyle = {
  color: 'black',
  textDecoration: 'none'
}
const titleStyle = {
  marginTop: '14px',
  marginLeft: '30px',
}


//logout link is shown in main header depending on wheather a currentUser is logged in
export default class MainLayoutHeader extends React.Component {
  constructor(props) {
    super(props)

    this.onOpenSidebar = this.onOpenSidebar.bind(this);
  }

  onOpenSidebar() {
    this.props.openSidebar(true)
  }

  render() {
    return (
      <div className="mainLayoutHeader" style={headerStyle}>
        <h2 style={titleStyle}>Roundtable</h2>
      </div>
    );
  }
}