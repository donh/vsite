import React, {Component} from 'react';
import Helmet from 'react-helmet';
// import { MiniInfoBar } from 'components';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>

        <p>This project was originally created by 冬冬
          (<a href="https://github.com/donh" target="_blank">@donh</a>), and has since been the hottest blockchain on the earth.
        </p>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}
