import React, { Component } from 'react';
import { Route } from 'react-router';
import { Router, Switch } from 'react-router-dom';
// fontasome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Login from './containers/login/login';
import { WrappedRegistrationForm } from './components/register/Register';
import { Main } from './components/main/Main';

import { history } from './history';
import './App.css';

library.add(faEnvelope);

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={WrappedRegistrationForm} />
            <Route path='/*' component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
