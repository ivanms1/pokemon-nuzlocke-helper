import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Nuzlocke from './pages/Nuzlocke';

import './App.css';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile/:userId'>
          <Profile />
        </Route>
        <Route path='/nuzlocke/:nuzlockeId'>
          <Nuzlocke />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
