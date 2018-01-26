import React from 'react';
import { Link } from 'react-router';
import LandingLayoutHeader from './LandingLayoutHeader';
import LandingLayoutFooter from './LandingLayoutFooter';

const containerStyle = {
  display: 'block',
  margin: '0 auto',
  width: '800px',
  fontFamily: 'Rodina-Regular',
  src: "url('assets/fonts/Rodina-Regular.otf')",
  color: '#BCABAE',
  backgroundColor: '#3A0824'
}

const containerBigStyle = {
  display: 'block',
  margin: '0 auto',
  width: '800px',
  fontFamily: 'Arial',
  backgroundColor: '#3A0824',
  width: '100%',
  height: '100%'
}


export default class LandingLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }

    let this_ = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this_.handleLogin(user)
      } else {
        this_.handleLogout()
      }
    });
  }

  handleLogin(user) {
    this.setState((prevState, props) => {
      let newState = prevState
      newState.loggedIn = true
      return newState
    })
  }

  handleLogout() {
    this.setState((prevState, props) => {
      let newState = prevState
      newState.loggedIn = false
      return newState
    })
  }

  render() {
    return (
      <div style={containerBigStyle}>
        <div style={containerStyle}>
          <header>
            <LandingLayoutHeader />
          </header>
          <div className="app-content">{this.props.children}</div>
          <footer>
            <LandingLayoutFooter />
          </footer>
        </div>
      </div>
    );
  }
}