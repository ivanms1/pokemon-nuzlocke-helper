import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Nuzlocke from './pages/Nuzlocke';
import Register from './pages/Register';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import PublicRoute from './components/Routes/PublicRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path='/'>
          <Home />
        </PublicRoute>
        <PublicRoute path='/register'>
          <Register />
        </PublicRoute>
        <PublicRoute path='/login'>
          <Login />
        </PublicRoute>
        <AuthenticatedRoute path='/profile/:userId'>
          <Profile />
        </AuthenticatedRoute>
        <AuthenticatedRoute path='/nuzlocke/:nuzlockeId'>
          <Nuzlocke />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};

export default App;
