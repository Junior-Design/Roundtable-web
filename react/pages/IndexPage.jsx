import React from 'react';
import { Link } from 'react-router';

const loginLinkStyle = {
  color: '#F2EEEA',
  textDecoration: 'none'
}

class ServiceLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick() {
    alert("Clicked " + this.props.service);
  }

  render() {
    return (
        <button onClick={this.handleClick} className="serviceLoginButton">
          {this.props.service}
        </button>
    );
  }
}

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="logoHeader">
        <span className="logo">roundtable</span>
        </div>
        <div className="serviceLoginGroup">
          <ServiceLoginButton service="Spotify" />
          <ServiceLoginButton service="Google Play" />
        </div>
      </div>
    );
  }
}