import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us" />

        <p>This project was originally created by 冬冬
          (<a href="https://github.com/donh" target="_blank" rel="noopener noreferrer">@donh</a>)
          , and has since been the hottest blockchain-based identity solution on the earth.
        </p>
      </div>
    );
  }
}
