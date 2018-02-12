import React from 'react';
import { Link } from 'react-router';
import MainLayoutHeader from './MainLayoutHeader';
import MainLayoutFooter from './MainLayoutFooter';



const containerStyle = {
  display: 'block',
  margin: '0 auto',
  src: 'url("assets/fonts/Rodina-Regular.otf")',
  backgroundImage: 'url("images/blur.jpg")',
  color: 'white',
  width: '100%',
  height: '100%'
}



export default class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   loggedIn: false
    // }

    // let this_ = this
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this_.handleLogin(user)
    //   } else {
    //     this_.handleLogout()
    //   }
    // });
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
    return (
      <div style={containerStyle}>
        <MainLayoutHeader />
        <div className="app-content">{this.props.children}</div>
        <MainLayoutFooter />
      </div>
    );
  }
}