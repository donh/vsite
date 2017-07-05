import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    JWT: state.auth.JWT,
    token: state.auth.token,
    user: state.auth.user
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    JWT: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    sendLoginRequest: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
    waitForLoginResponse: PropTypes.func
  }
  componentDidMount() {
    this.props.sendLoginRequest();
  }
  componentDidUpdate() {
    const {token, user, waitForLoginResponse} = this.props;
    if (token && !user) {
      waitForLoginResponse(token);
    }
  }
  render() {
    const {JWT, logout, token, user} = this.props;
    const styles = require('./Login.scss');
    console.log('user =', user);
    console.log('token =', token);
    console.log('JWT =', JWT);
    const QR = QRUtil.getQRDataURI(JWT);
    // <img style="z-index:102;" src="' + qrImageUri + '"/>
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Login</h1>
        <Helmet title="Login"/>
        {!user &&
        <div>
          <img src={QR} />
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
