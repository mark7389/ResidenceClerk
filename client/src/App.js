import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
class App extends Component {
  state = {
    username: "",
    password: "",
    
    logged: false
  }
  componentDidMount(){
    axios.get("/api/bees/isAuth").then(res=>{
      console.log(res);
      this.setState({logged:res.data.msg});
    }).catch(err=>{
      console.log(err);
    })
  }
  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
      this.setState({
        [name]:value
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      
    }
    console.log(data);
    axios.post("/api/bees/login", data).then(res=>{
      if(res.data.msg === "login successful"){
        this.setState({logged:true});
      }else{
        console.log(res);
      }
    }).catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.logged ? <h1>welcome</h1>:(<form>
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
              
              <button type="button"  onClick={this.handleSubmit}>submit</button>
        </form>)}
      </div>
    );
  }
}

export default App;
