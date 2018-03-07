import React from 'react';
import { Link } from 'react-router';



const containerStyle = {
  display: 'block',
  margin: '0 auto',
  src: 'url("assets/fonts/Objektiv-Mk1-Regular.otf")',
  backgroundImage: 'url("/assets/images/blur.jpg")',
  backgroundSize: "100% 100%",
  fontFamily: 'Objektiv',
  color: 'white',
  width: '100%',
  height: '100%',
  overflowY: 'scroll'
}



export default class RootLayout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={containerStyle} className="app-content">
        {this.props.children}
      </div>
    );
  }
}