import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Home.scss';
import { GithubButton } from '../../components';
import config from '../../config';
import logoImage from '../../../static/logo.png';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p><img src={logoImage} alt="logo" /></p>
            </div>
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
            <p>
              <a
                className={styles.github}
                href="https://github.com/donh/vsite"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fa fa-github" /> View on Github
              </a>
            </p>
            <GithubButton
              user="donh" repo="vsite" type="star"
              width={160} height={30} count large
            />

            <p className={styles.humility}>
              Created and maintained by <a href="https://github.com/donh" target="_blank" rel="noopener noreferrer">冬冬</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <header>
            <h1>vChain Demo</h1>
          </header>
          <hr />
        </div>
      </div>
    );
  }
}
