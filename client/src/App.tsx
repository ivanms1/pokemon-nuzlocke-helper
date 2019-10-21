import React from 'react';
import
{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './pages/Login';
import Profile from './pages/Profile';
import Nuzlocke from './pages/Nuzlocke';

import './App.css'

const App: React.FC = () =>
{
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile/:userId">
          <Profile />
        </Route>
        <Route path="/nuzlocke/:nuzlockeId">
          <Nuzlocke />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
