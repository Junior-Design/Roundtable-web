import React from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Link } from 'react-router';
import { AsyncStorage } from 'react'
import MainLayoutHeader from './MainLayoutHeader';

const containerStyle = {
  display: 'block',
  margin: '0 auto',
  backgroundImage: 'url("images/blur.jpg")',
  color: 'black',
  width: '100%',
  height: '100%'
}

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none'
}

export default class MainLayout extends React.Component {

  constructor(props) {
    super(props)

     this.state = {
       loggedIn: false,
       sidebarOpen: true,
     }

     this.onNavButton = this.onNavButton.bind(this);
  }

  onNavButton(props) {

  }

  render() {
    const items = [
      <br />,
      <Link to='/browse' style={linkStyle}><SidebarItem nav="browse">Browse</SidebarItem></Link>,
      <Link to='/playlists' style={linkStyle}><SidebarItem nav="playlists">Playlists</SidebarItem></Link>,
      <Link to='/friends' style={linkStyle}><SidebarItem nav="friends">Friends</SidebarItem></Link>,
      <Link to='/' style={linkStyle}><SidebarItem nav="logout">Logout</SidebarItem></Link>,
    ];

    return (
      <div>
        <Sidebar content={items} onItemSelected={this.onNavButton}>
        <MainLayoutHeader title="roundtable"/>
        <div className="main-content" style={{paddingLeft: '30px'}}>{this.props.children}</div>
        </Sidebar>
      </div>
    );
  }
}