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
        // if this user hasn't connected any streaming services yet, we should send then to `/connect` instead.
        window.location = "/browse"

        return true
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
        <br />
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}