import React from 'react';
import { Link } from 'react-router';

import LoginForm from "../components/LoginForm"
import comms from '../comms'


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="login-content">
        <LoginForm service="Google Play" handler={this.handleLogin}/>
      </div>
    );
  }
        
  handleLogin(account) {
    // save credentials info as cookies and redirect to /browse
    comms.setCookie('music-service', 'google-play')
    comms.setCookie('google-play-username', account.username)
    comms.setCookie('google-play-password', account.password)
    window.location = "/browse"
  }
}