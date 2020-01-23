import React from 'react';

import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.About}>
      <h1>About</h1>
      <h3>
        Created by{' '}
        <a
          href='https://www.ivansaldano.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ivan
        </a>
      </h3>
      <p>
        This is a gift to the pokemon community, free to use. Gotta catch'em
        all!
      </p>
    </div>
  );
};

export default About;
