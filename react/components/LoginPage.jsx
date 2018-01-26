import React from 'react';
import { Link } from 'react-router';

const uiConfig = {
  signInSuccessUrl: '/browse',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: function(user) {
      // if (self.props.onSignIn) {
      //   self.props.onSignIn(user);
      // }
      return false;
    }
  }
  // Terms of service url.
  // tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
let authUI = new firebaseui.auth.AuthUI(firebase.auth());



export default class LoginPage extends React.Component {

  componentDidMount() {
    authUI.start('#firebaseui-auth-container', uiConfig);
  }

  componentWillUnmount() {
    authUI.reset();
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <br />
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}