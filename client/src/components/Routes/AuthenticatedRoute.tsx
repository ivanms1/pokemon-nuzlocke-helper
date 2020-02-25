import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Context from '../AppContext';
import DesktopNavbar from '../NavbarMenu/DesktopNavbar';
import MobileNavbar from '../NavbarMenu/MobileNavbar';

import useCurrentUser from '../UseCurrentUser';

interface AuthenticatedRouteProps {
  path: string;
  children: React.ReactNode;
}

const AuthenticatedRoute = ({ path, children }: AuthenticatedRouteProps) => {
  const { currentUser, loading: userLoading } = useCurrentUser();
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  if (userLoading || !currentUser) {
    return null;
  }
  return (
    <Route path={path}>
      <DesktopNavbar />
      <MobileNavbar />
      {children}
    </Route>
  );
};

export default AuthenticatedRoute;
