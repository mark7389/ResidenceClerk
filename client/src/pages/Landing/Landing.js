import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Landing.css';
import NavBar from '../../components/NavBar';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import LoginButton from '../../components/NavBar/LoginButton';
import {default as API} from '../../util/APIUsers/API';
class Landing extends Component {

  state = {
    signedIn: false,
    signUp: true,
    username:"",
    pwd:"",
    nickname:"",
    EmailErr:"",
    PasswordErr:"",
    nicknameErr:"",
    accountCreated:""
  }
  componentDidMount(){
    API.IsAuth().then(res=>{
        if(res.data.msg){
          window.location.href="/Home";
        }
    }).catch(err=>{
      console.log(err);
    })
  }
  handleLoginRequest = (e)=>{
    e.preventDefault();
    let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(this.state.username));
    if(this.state.username === "" || !re.test(this.state.username)){
        this.setState({EmailErr:"invalid email"})
    }
    else if(this.state.password.length < 6 || this.state.password === ""){
      this.setState({PasswordErr:"invalid password"});
    }
    else{
        API.Login(this.state.username, this.state.password).then(res=>{
          console.log(res.data.msg);
          window.location.href="/Home"
        }).catch(err=>{
          console.log(err);
        })
    }
  }

  handleSignUpRequest = (e)=>{
        e.preventDefault();
        let re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
          //do api call set signUp to false
          
          API.SignUp(this.state.username,this.state.password,this.state.nickname)
          .then(result=>{
            console.log(result.data);
            if(result.data.msg === "user created"){
              this.setState({signUp:false,
                            accountCreated:"Thank you for signing up now you can login!"})
            }
          }

          ).catch(err=>{
            console.log(err);
          })
        }
  }

  handleLoginClick = ()=>{
        
        console.log("here")
        this.setState({signUp:false});
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
                onClick={this.handleLoginClick}
                rightIcon={<LoginButton/>}/>
        {this.state.signUp ? (<SignUpForm {...this.state}
                              SignUpRequest={this.handleSignUpRequest}
                              onChange={this.handleInputChange}/>):
                              (<LoginForm 
                                message={this.state.accountCreated}
                                LoginRequest={this.handleLoginRequest}
                                onChange={this.handleInputChange} />)}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Landing;

