
import React from 'react';
import { Link } from 'react-router';

import server from '../server_requests'


export default class SpotifyConfirmationPage extends React.Component {

  componentDidMount() {
    window.location = "/browse"
		//TODO: the auth token is part of the url query params. We need to pluck that out and save it as a cookie, presumably.
  }

  render() {
    return (
				<div>Redirecting...</div>
    );
  }
}
