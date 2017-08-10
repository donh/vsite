import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import styles from './Login.scss';
import { Loading, Stark } from '../../components';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    loading: state.auth.loading,
    JWT: state.auth.JWT,
    token: state.auth.token,
    user: state.auth.user
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    JWT: PropTypes.string,
    sendLoginRequest: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.object,
    waitForLoginResponse: PropTypes.func
  }
  state = {
    showLoadingAndQRCode: false,
    showStark: true
  };
  componentDidMount() {
    this.props.sendLoginRequest();
  }
  componentDidUpdate() {
    const { token, user, waitForLoginResponse } = this.props;
    if (token && !user) {
      waitForLoginResponse(token);
    }
  }
  clickStarkLoginButton = () => {
    this.setState({
      showLoadingAndQRCode: true,
      showStark: false
    });
  }
  render() {
    const { JWT, loading, logout, user } = this.props;
    const QR = QRUtil.getQRDataURI(JWT);
    const { showLoadingAndQRCode, showStark } = this.state;
    const loadingClassName = showLoadingAndQRCode ? '' : 'hide';
    const QRCodeClassName = (showLoadingAndQRCode && !loading) ? '' : 'hide';
    return (
      <div className={`${styles.loginPage} container`}>
        <h1>Login</h1>
        <Helmet title="Login" />
        <Stark show={showStark} clickStarkLoginButton={this.clickStarkLoginButton} />

        <div className={QRCodeClassName}>
          {!user &&
          <div className={styles.centered}>
            <img src={QR} alt="Login QR code" />
          </div>
          }
          {user &&
          <div>
            <p>You are currently logged in as {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}>
                <i className="fa fa-sign-out" />{' '}Log Out
              </button>
            </div>
          </div>
          }
        </div>

        <div className={loadingClassName}>
          <Loading show={loading} />
        </div>
      </div>
    );
  }
}
