import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SignUpButton = (props)=>{
  const styles = {
    color:"whitesmoke",
    textShadow:"0px 0.4px 0px rgb(73,81,91)",
    margin:0,
    padding:0,
    border:"none"
  }
  return (<RaisedButton 
            fullWidth={true}
            onClick={props.onClick}
            backgroundColor="rgb(237,187,0)" 
            
            ><h3 style={styles}>Create Account</h3></RaisedButton>)
}

export default SignUpButton;