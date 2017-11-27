import React from 'react';
import { Link } from 'react-router';

const formStyle = {
  textAlign: 'center'
}

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <br />
        <form action="/browse" style={formStyle}>
        Username: <input type="text" /><br /><br />
        Password: <input type="password" /><br /><br />
        <input type="submit" value="Login" /><br /><br />
        </form>
      </div>
    );
  }
}