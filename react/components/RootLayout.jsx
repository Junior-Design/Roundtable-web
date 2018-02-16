import React from 'react';
import { Link } from 'react-router';



const containerStyle = {
  display: 'block',
  margin: '0 auto',
  src: 'url("assets/fonts/Rodina-Regular.otf")',
  backgroundImage: 'url("/assets/images/blur.jpg")',
  color: 'white',
  width: '100%',
  height: '100%'
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