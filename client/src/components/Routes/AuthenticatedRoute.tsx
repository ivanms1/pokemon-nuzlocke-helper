import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { Navbar, Button } from '@blueprintjs/core';

import Context from '../AppContext';
import useCurrentUser from '../UseCurrentUser';

import styles from './AuthenticatedRoute.module.css';

interface AuthenticatedRouteProps {
  path: string;
  children: React.ReactNode;
}

const AuthenticatedRoute = ({ path, children }: AuthenticatedRouteProps) => {
  const [currentPage, setCurrentPage] = useState('nuzlockes');
  const { currentUser, loading: userLoading } = useCurrentUser();
  const history = useHistory();
  const { isAuthenticated, onLogout } = useContext(Context);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  if (userLoading || !currentUser) {
    return null;
  }
  return (
    <Route path={path}>
      <Navbar fixedToTop className='bp3-dark'>
        <Navbar.Group align='left'>
          <Navbar.Heading>Nuzlocke Tracker</Navbar.Heading>
          <Navbar.Divider />
          <Button
            minimal
            className={classNames({
              [styles.active]: currentPage === 'nuzlockes'
            })}
            icon='map-create'
            text='Nuzlockes'
            onClick={() => {
              setCurrentPage('nuzlockes');
              history.push(`/profile/${currentUser.id}`);
            }}
          />
          <Button
            minimal
            className={classNames({
              [styles.active]: currentPage === 'about'
            })}
            icon='info-sign'
            text='About'
            onClick={() => {
              setCurrentPage('about');
              history.push('/about');
            }}
          />
        </Navbar.Group>
        <Navbar.Group align='right'>
          <Button
            minimal
            icon='log-out'
            text='Logout'
            onClick={async () => {
              await onLogout();
              history.push('/login');
            }}
          />
        </Navbar.Group>
      </Navbar>
      {children}
    </Route>
  );
};

export default AuthenticatedRoute;
