import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/Home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
