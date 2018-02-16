import React from 'react';
import { Link } from 'react-router';
import MainLayoutHeader from './MainLayoutHeader';
import MainLayoutFooter from './MainLayoutFooter';



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
      <div>
        <MainLayoutHeader />
        <div className="main-content">{this.props.children}</div>
        <MainLayoutFooter />
      </div>
    );
  }
}