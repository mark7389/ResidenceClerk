import React from 'react';
import './LoginForm.css';
import Paper from 'material-ui/Paper'
import Input from '../Input';
import SignInButton from './SignInButton';
const LoginForm = (props)=>{
  const styles = {
    border:"2px solid whitesmoke",
    width: "100%",
    background:"whitesmoke"
  }
  return (
    <div className="login">
        <Paper className="form-container" style={styles} zDepth={1}>
            <div className="loginMSG">
            <h1>Login</h1>
            <p>{props.message}</p>
            </div>
            <form className="forms">
                <Input floatingLabelText="Email"
                       errorText={props.EmailErr}
                       onChange={props.onChange}
                       name="username"
                       type="text"
                       value={props.username}
                       /><br/>
                <Input floatingLabelText="Password"
                       onChange={props.onChange}
                       name="password"
                       type="password"
                       value={props.password}
                       errorText={props.PasswordError}/><br/><br />
                <SignInButton onClick={props.LoginRequest}/>
            </form>
        </Paper>
    </div>
  )
}

export default LoginForm;