
import React from 'react';
import { Link } from 'react-router';

import comms from '../comms'


export default class SpotifyConfirmationPage extends React.Component {

  componentDidMount() {

    // (1) take the `spotify-token` from the URL's query parameters,
    // (2) save it in a cookie,
    // (3) and then redirect to /browse

		function queryParameter(name, url) {
    	var url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var token = queryParameter("token")
    var expires_in = parseInt(queryParameter("expires_in"))
    comms.setCookie('spotify-token', token, expires_in)

    window.location = "/browse"
  }

  render() {
    return (
				<div>Redirecting...</div>
    );
  }
}
