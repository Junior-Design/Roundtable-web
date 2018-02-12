import React from 'react';
import { Link } from 'react-router';

import comms from '../comms'


export default class TestAPIPage extends React.Component {

  componentDidMount() {
    comms.post('/test_api_route', "posted data", function(resp) {
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
