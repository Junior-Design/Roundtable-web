import React from 'react';
import { Link } from 'react-router';

import LoginForm from "../components/LoginForm"


class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-content">
        <LoginForm />
      </div>
    );
  }
}