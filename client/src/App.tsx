import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Nuzlocke from './pages/Nuzlocke';
import Register from './pages/Register';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';

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
