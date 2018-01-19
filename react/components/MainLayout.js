import React from 'react';
import { Link } from 'react-router';
import MainLayoutHeader from './MainLayoutHeader';
import MainLayoutFooter from './MainLayoutFooter';

const containerStyle = {
  display: 'block',
  margin: '0 auto',
  width: '800px',
  fontFamily: 'Arial'
}

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className="app-container" style={containerStyle}>
        <header>
          <MainLayoutHeader />
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <MainLayoutFooter />
        </footer>
      </div>
    );
  }
}