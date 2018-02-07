import React from 'react';
import { Link } from 'react-router';


export default class LogoutPage extends React.Component {

  componentDidMount() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="logout">
        <h2>Logged out!</h2>
      </div>
    );
  }
}