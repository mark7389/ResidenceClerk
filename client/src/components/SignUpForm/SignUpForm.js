import React from 'react';
import SignUpButton from './SignUpButton';
import './SignUpForm.css';
import Paper from 'material-ui/Paper'
import Input from '../Input';
const SignUpForm = (props)=>{

  const styles = {
    border:"2px solid whitesmoke",
    width: "100%",
    background:"whitesmoke"
  }
  return(
    <div className="signUp">
        <Paper className="form-container" style={styles} zDepth={1}>
            <span className="signupheader"><h1>Sign Up</h1></span>
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
                       errorText={props.PasswordError}/><br />
                <Input floatingLabelText="Nickname"
                       onChange={props.onChange}
                       name="nickname"
                       type="text"
                       value={props.nickname}
                       errorText={props.nicknameError}/><br /><br />
                <SignUpButton onClick={props.SignUpRequest}/>
            </form>
        </Paper>
    </div>
  )
}

export default SignUpForm;