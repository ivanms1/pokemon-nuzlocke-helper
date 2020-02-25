import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Navbar, Button } from '@blueprintjs/core';

import Context from '../AppContext';

import useCurrentUser from '../UseCurrentUser';

import styles from './Navbar.module.css';

const DesktopNavbar = () => {
  const [currentPage, setCurrentPage] = useState('nuzlockes');
  const { currentUser, loading: userLoading } = useCurrentUser();
  const { onLogout } = useContext(Context);

  const history = useHistory();

  if (userLoading || !currentUser) {
    return null;
  }
  return (
    <Navbar fixedToTop className={classNames('bp3-dark', styles.DesktopNavbar)}>
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
  );
};

export default DesktopNavbar;
