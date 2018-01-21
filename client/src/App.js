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
      this.setState({logged:res.msg});
    }).catch(err=>{
      console.log(err);
    })
  }
  handleChange = (event) => {
      this.setState({
        username: event.target.username,
        password: event.target.password
      });
  }
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post("/api/bees/login", data).then(res=>{
      if(res.msg){
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
              <input type="text" name="username" onChange={this.handleChange}/>
              <input type="password" name="password" onChange={this.handleChange}/>
              <button type="button"  onClick={this.handleSubmit} />
        </form>)}
      </div>
    );
  }
}

export default App;
