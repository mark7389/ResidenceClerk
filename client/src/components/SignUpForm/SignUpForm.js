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
            <h1>Sign Up</h1>
            <form className="forms">
                <Input floatingLabelText="Email"
                       errorText={props.EmailErr}
                       onChange={props.handleInputChange}
                       /><br/>
                <Input floatingLabelText="Password"/><br />
                <Input floatingLabelText="Nickname"/><br />
                
            </form>
        </Paper>
    </div>
  )
}

export default SignUpForm;