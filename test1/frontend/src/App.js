import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';

import HomePage from './HomePage';
import PrivateRoute from './privateRoute';

class App extends Component {
  render(){
    return(
<Router>
        <PrivateRoute exact path="/homePage" component={HomePage} />
        <Route exact path="/" component={Header} />

        </Router>
    )
  }

}

export default App;
