import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Landing.css';
import NavBar from '../../components/NavBar';
import SignUpForm from '../../components/SignUpForm';

class Landing extends Component {

  state = {
    signedIn: false,
    signUp: true,
    username:"",
    pwd:"",
    nickname:"",
    EmailErr:"",
    PasswordErr:"",
    nicknameErr:""
  }

  handleLoginRequest = ()=>{

  }

  handleSignUpRequest = (e)=>{
        e.preventDefault();
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(this.state.username));
        if(this.state.username === "" || !re.test(this.state.username)){
            this.setState({EmailErr:"invalid email"})
        }
        else if(this.state.password.length < 6 || this.state.password === ""){
          this.setState({PasswordErr:"invalid password"});
        }
        else if(this.state.nickname === ""){
          this.setState({nicknameErr:"nickname required!"})
        }
        else{
          //do api call
        }
  }

  handleLoginClick = ()=>{

  }
  handleInputChange = ()=>{

  }
  handleInputChange = (event)=>{
    event.preventDefault();
    const name=event.target.name;
    const value=event.target.value;
    this.setState({
      [name]:value
    })
  }

render(){

  return(
      <MuiThemeProvider>
       <div>
        <NavBar signedIn={this.state.signedIn}
                LoginClick={this.handleLoginClick}/>
        {this.state.signUp ? (<SignUpForm {...this.state}
                              SignUpRequest={this.handleSignUpRequest}
                              onChange={this.handleInputChange}/>):(<div />)}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Landing;

