import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes'


// Renders React code once the page has loaded completely
window.onload = () => {
  ReactDOM.render(<AppRouter />, document.getElementById('root'));
};

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
    );
  }
}

