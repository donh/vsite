import { CounterButton, GithubButton } from 'components';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
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
    const logoImage = require('./logo.png');
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
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>

          <p>This starter boilerplate app uses the following technologies:</p>
          <header><h1>vChain Demo</h1></header>
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

          <h3>Features demonstrated in this project</h3>

          <dl>
            <dt>Multiple components subscribing to same redux store slice</dt>
            <dd>
              The <code>App.js</code> that wraps all the pages contains an <code>InfoBar</code> component
              that fetches data from the server initially, but allows for the user to refresh the data from
              the client. <code>About.js</code> contains a <code>MiniInfoBar</code> that displays the same
              data.
            </dd>
            <dt>Server-side data loading</dt>
            <dd>
              The <Link to="/widgets">Widgets page</Link> demonstrates how to fetch data asynchronously from
              some source that is needed to complete the server-side rendering. <code>Widgets.js</code>'s
              <code>asyncConnect()</code> function is called before the widgets page is loaded, on either the server
              or the client, allowing all the widget data to be loaded and ready for the page to render.
            </dd>
            <dt>Data loading errors</dt>
            <dd>
              The <Link to="/widgets">Widgets page</Link> also demonstrates how to deal with data loading
              errors in Redux. The API endpoint that delivers the widget data intentionally fails 33% of
              the time to highlight this. The <code>clientMiddleware</code> sends an error action which
              the <code>widgets</code> reducer picks up and saves to the Redux state for presenting to the user.
            </dd>
            <dt>Session based login</dt>
            <dd>
              On the <Link to="/login">Login page</Link> you can submit a username which will be sent to the server
              and stored in the session. Subsequent refreshes will show that you are still logged in.
            </dd>
            <dt>Redirect after state change</dt>
            <dd>
              After you log in, you will be redirected to a Login Success page. This <strike>magic</strike> logic
              is performed in <code>componentWillReceiveProps()</code> in <code>App.js</code>, but it could
              be done in any component that listens to the appropriate store slice, via Redux's <code>@connect</code>,
              and pulls the router from the context.
            </dd>
            <dt>Auth-required views</dt>
            <dd>
              The aforementioned Login Success page is only visible to you if you are logged in. If you try
              to <Link to="/loginSuccess">go there</Link> when you are not logged in, you will be forwarded back
              to this home page. This <strike>magic</strike> logic is performed by the
              <code>onEnter</code> hook within <code>routes.js</code>.
            </dd>
            <dt>Forms</dt>
            <dd>
              The <Link to="/survey">Survey page</Link> uses the
              still-experimental <a href="https://github.com/erikras/redux-form" target="_blank">redux-form</a> to
              manage form state inside the Redux store. This includes immediate client-side validation.
            </dd>
            <dt>Pagination</dt>
            <dd>
              The <Link to="/pagination">Pagination page</Link> uses
              <a href="https://www.npmjs.com/package/violet-paginator" target="_blank">violet-paginator</a> to
              paginate and sort records in a data table.
            </dd>
            <dt>WebSockets / socket.io</dt>
            <dd>
              The <Link to="/chat">Chat</Link> uses the socket.io technology for real-time
              communication between clients. You need to <Link to="/login">login</Link> first.
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
