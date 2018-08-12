import React, { Component } from 'react';
import styles from './Header.css';

class Header extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>RedditData</h1>
      </div>
    );
  }
}

export default Header;
