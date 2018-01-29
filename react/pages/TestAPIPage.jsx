import React from 'react';
import { Link } from 'react-router';

import server from '../server_requests'


export default class TestAPIPage extends React.Component {

  componentDidMount() {
    server.post('/test_api_route', "posted data", function(resp) {
        console.log("received response:", resp)
    })
  }

  render() {
    return (
      <div className="logout">
        check console..
      </div>
    );
  }
}
