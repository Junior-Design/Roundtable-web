import React from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { Link } from 'react-router';
import MainLayoutHeader from './MainLayoutHeader';

const containerStyle = {
  display: 'block',
  margin: '0 auto',
  src: 'url("assets/fonts/Rodina-Regular.otf")',
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

    // let this_ = this
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this_.handleLogin(user)
    //   } else {
    //     this_.handleLogout()
    //   }
    // });
  }

  onNavButton(props) {

  }

  // handleLogin(user) {
  //   this.setState((prevState, props) => {
  //     return {user: user}
  //   })
  // }

  // handleLogout() {
  //   this.setState((prevState, props) => {
  //     return {user: null}
  //   })
  // }

  render() {
    const items = [
      <SidebarItem> </SidebarItem>,
      <Link to='/browse' style={linkStyle}><SidebarItem nav="browse">Browse</SidebarItem></Link>,
      <Link to='/playlists' style={linkStyle}><SidebarItem nav="playlists">Playlists</SidebarItem></Link>,
      <Link to='/friends' style={linkStyle}><SidebarItem nav="friends">Friends</SidebarItem></Link>,
    ];

    return (
      <div>
        <Sidebar content={items} onItemSelected={this.onNavButton}>
        <MainLayoutHeader/>
        <div className="main-content">{this.props.children}</div>
        </Sidebar>
      </div>
    );
  }
}