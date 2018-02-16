import React from 'react';
import { Link } from 'react-router';

import LoginForm from "../components/LoginForm"


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="login-content">
        <LoginForm service="Google Play"/>
      </div>
    );
  }
}