import React from 'react';
import { Link } from 'react-router';

const compStyle = {
  width:"80%",
  maxWidth:"360px",
  padding:"100px 0 0",
  margin:"auto"
}

const formStyle = {
  position:"relative",
  background:"#FFFFFF",
  margin:"0 auto 100px",
  padding:"30px",
  textAlign:"center",
  borderRadius: '5px',
}

const inputStyle = {
  outline:"0",
  background: "#f2f2f2",
  width: "100%",
  border: "0",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  fontSize: "14px",
  borderRadius: '5px',
}

const buttonStlye = {
  textTransform: "uppercase",
  outline: "0",
  backgroundColor: '#031738',
  border: 'none',
  color: 'white',
  fontFamily: 'Rodina',
  width: "100%",
  border: "0",
  padding: "15px",
  borderRadius: '5px',
  fontSize: "14px",
  transition: "all 0.3 ease"
}

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={compStyle}>
        <form style={formStyle}>
            <input style={inputStyle} type="text" placeholder="username" required/>
            <input style={inputStyle} type="password" placeholder="password" required/>
            <button style={buttonStlye}>login to {this.props.service}</button>
        </form>
      </div>
    );
  }
}
