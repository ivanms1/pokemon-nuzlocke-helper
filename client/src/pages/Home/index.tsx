import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@blueprintjs/core';

import styles from './Home.module.css';

const Home = () => {
  const history = useHistory();
  return (
    <div className={styles.Home}>
      <Button
        type='button'
        icon='log-in'
        minimal
        className={styles.LoginButton}
        onClick={() => history.push('/login')}
      >
        Login
      </Button>
      <div className={styles.ActionBox}>
        <h1>Welcome to the Pokemon Nuzlocke helper</h1>
        <span>
          Track and manage your team and encounters, prevent using illegal
          pokemons or pairs.
        </span>
        <Button
          type='button'
          icon='confirm'
          className={styles.GetStartedButton}
          onClick={() => history.push('/register')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
