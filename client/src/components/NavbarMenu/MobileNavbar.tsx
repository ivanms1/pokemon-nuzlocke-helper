import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Navbar, Button, Drawer, Menu } from '@blueprintjs/core';

import useCurrentUser from '../UseCurrentUser';
import Context from '../AppContext';

import styles from './Navbar.module.css';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, loading: userLoading } = useCurrentUser();
  const { onLogout } = useContext(Context);

  const history = useHistory();

  if (userLoading || !currentUser) {
    return null;
  }
  return (
    <Navbar fixedToTop className={classNames('bp3-dark', styles.MobileNavbar)}>
      <Navbar.Group align='left'>
        <Navbar.Heading>
          <Button
            large
            className={classNames('bp3-minimal', styles.MenuButton)}
            onClick={() => setIsMenuOpen(true)}
            icon='menu'
            text='Nuzlocke Tracker'
          />
        </Navbar.Heading>
      </Navbar.Group>
      <Drawer
        position='left'
        size={Drawer.SIZE_LARGE}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Menu className={styles.SideBar}>
          <li>
            <h6 className={styles.MobileMenuHeader}>Nuzlocke Helper</h6>
          </li>
          <Menu.Item
            className={styles.MobileMenuItem}
            textClassName={styles.MobileNavbarText}
            onClick={() => {
              history.push(`/profile/${currentUser.id}`);
              setIsMenuOpen(false);
            }}
            icon='map-create'
            text='Nuzlockes'
          />
          <Menu.Item
            className={styles.MobileMenuItem}
            textClassName={styles.MobileNavbarText}
            icon='info-sign'
            text='About'
            onClick={() => {
              history.push('/about');
              setIsMenuOpen(false);
            }}
          />
          <Menu.Item
            className={styles.MobileMenuItem}
            textClassName={styles.MobileNavbarText}
            icon='log-out'
            text='Logout'
            onClick={async () => {
              await onLogout();
              history.push('/login');
            }}
          />
        </Menu>
      </Drawer>
    </Navbar>
  );
};

export default MobileNavbar;
