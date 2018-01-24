import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Landing from './pages/Landing';
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
              <Route exact path="/" component={Landing} />
          
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
