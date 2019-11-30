import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Context from '../AppContext';

interface AuthenticatedRouteProps {
  path: string;
  children: React.ReactNode;
}

const AuthenticatedRoute = ({ path, children }: AuthenticatedRouteProps) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }
  return <Route path={path}>{children}</Route>;
};

export default AuthenticatedRoute;
