import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Landing.css';
import NavBar from '../../components/NavBar';
import SignUpForm from '../../components/SignUpForm';

class Landing extends Component {

  state = {
    signedIn: false,
    signUp: true,
    login:false
  }

  handleLoginRequest = ()=>{

  }

  handleSignUpRequest = ()=>{

  }

  handleLoginClick = ()=>{

  }

render(){

  return(
      <MuiThemeProvider>
        <NavBar signedIn={this.state.signedIn}
                LoginClick={this.handleLoginClick}/>
        <SignUpForm />
      </MuiThemeProvider>
    )
  }
}

export default Landing;

