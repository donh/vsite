import { GithubButton } from 'components';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { SimpleSigner } from 'uport';
import { Connect } from '../../../lib/index';
import config from '../../config';

const vPort = new Connect('uPort Demo', {
  clientId: '0x2bede7ae69a9aa7684c373ae33fb21162e565e52',
  signer: new SimpleSigner('d2942f08d12611429c0ab9ea39eeda128253553d356b4c9f9f17f95e141cafc8')
});

export default class Home extends Component {
  state = {
    username: '',
    UTXO: ''
  }
  loginBtnClick = () => {
    console.log('loginBtnClick()');
    console.log('vPort =', vPort);
    const connectResponse = vPort.requestCredentials().then(credentials => {
      console.log(credentials);
      this.setState({
        username: credentials.name,
        UTXO: credentials.address
      });
    }, console.err);
    console.log('connectResponse =', connectResponse);
  }
  updateStatus = () => {
    console.log('updateStatus()');
    const statusContract = vPort.contract(
      [
        {
          constant: false,
          inputs: [
            {
              name: 'status',
              type: 'string'
            }
          ],
          name: 'updateStatus',
          outputs: [],
          type: 'function'
        },
        {
          constant: true,
          inputs: [
            {
              name: 'addr',
              type: 'address'
            }
          ],
          name: 'getStatus',
          outputs: [
            {
              name: '',
              type: 'string'
            }
          ],
          type: 'function'
        }
      ]
    );
    const status = statusContract.at('0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087');
    console.log('this = ', this);
    console.log('statusContract = ', statusContract);
    const statusInput = ReactDOM.findDOMNode(this.refs.statusInput);
    console.log('statusInput = ', statusInput);
    const statusMsg = statusInput.value;
    console.log('statusMsg = ', statusMsg);

    status.updateStatus(statusMsg).then(tx => {
      console.log(tx);
      // $("#txHashStatus").textContent = tx
    });
  }
  render() {
    const {username, UTXO} = this.state;
    const styles = require('./Home.scss');
    const logoImage = require('../../../static/logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p><img src={logoImage}/></p>
            </div>
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
            <p>
              <a className={styles.github} href="https://github.com/donh/vsite"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="donh"
                          repo="vsite"
                          type="star"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created and maintained by <a href="https://github.com/donh" target="_blank">冬冬</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <header>
            <h1>vChain Demo</h1>
          </header>
          <hr/>
          <section>
            <h2>Connect vPort</h2>
            <ul>
              <li>Address: {UTXO}</li>
              <li>Name: {username}</li>
            </ul>
            <table>
              <tbody>
                <tr><td>
                  <span>Address: {UTXO}</span>
                </td></tr>
                <tr><td>
                  <span>Name: {username}</span>
                </td></tr>
              </tbody>
            </table>
            <button className="btn btn-sm btn-primary" id="connectvPortBtn" onClick={this.loginBtnClick}>
              Connect vPort
            </button>
          </section>

          <hr/>
          <section>
            <h2>Set Status</h2>
            <div>Show:</div>
            <div>
              <input type="text" id="sts" ref="statusInput" size="20" placeholder="Feeling good"/>
            </div>
            <div>
              <button className="btn btn-sm btn-warning" onClick={this.updateStatus}>
                Update Status
              </button>
            </div>
          </section>
          <hr/>
        </div>
      </div>
    );
  }
}
