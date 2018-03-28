import React from 'react';
import { Link } from 'react-router';

const headerStyle = {
  width: '100%',
  height: '55px',
  borderBottom: '1px solid white'
}
const headerLinkStyle = {
  color: 'black',
  textDecoration: 'none'
}
const titleStyle = {
  marginTop: '8px',
  marginLeft: '58px',
}

/*const searchbarStyle = {
  paddingTop: 20,
    backgroundColor: 'white',
    borderBottomColor: 'gainsboro',
    paddingBottom: 5,
    paddingHorizontal: 4
}*/


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
        <h1 style={titleStyle}>roundtable</h1>
      </div>
    );
  }
}