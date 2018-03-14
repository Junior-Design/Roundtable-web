import React from 'react';
import { Link } from 'react-router';

import LoginForm from "../components/LoginForm"
import comms from '../comms'


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    // spotify redirect
    let query = props.location.query
    if (query.token && query.expires_in) {
      this.state = {'service': 'Spotify'}
      comms.setCookie('music-service', 'spotify', query.expires_in)
      comms.setCookie('spotify-token', query.token, query.expires_in)
      window.location = "/browse"
    } else {
      this.state = {'service': 'Google Play'}
    }
  }

  render() {
    return (
      <div className="login-content">
        <LoginForm service={this.state.service} handler={this.handleLogin}/>
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