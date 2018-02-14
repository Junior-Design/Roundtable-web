import React from 'react';
import { Link } from 'react-router';

class LoginForm extends React.Component {
  render() {
    return (
        <form>
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>
        </form>
    );
  }
}