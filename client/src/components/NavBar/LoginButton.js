import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const LoginButton = (props)=>{
  const styles = {
    color:"whitesmoke",
    textShadow:"0px 0.4px 0px rgb(73,81,91)",
    margin:0,
    padding:"3px",
    border:"none",
    width:"100%",
    boxShadow:"none"
  }
  return (<RaisedButton 
            fullWidth={true}
            backgroundColor="rgb(237,187,0)" 
            onClick={props.onRightIconButtonClick}
            ><h3 style={styles}>Login</h3></RaisedButton>)
}

export default LoginButton;