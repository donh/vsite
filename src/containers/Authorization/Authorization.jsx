import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as authorizationActions from 'redux/modules/authorization';
import styles from './Authorization.scss';
import { Loading } from '../../components';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    callback: state.authorization.callback,
    loading: state.authorization.loading,
    JWT: state.authorization.JWT,
    socketConnected: state.authorization.socketConnected,
    token: state.authorization.token,
    user: state.authorization.user
  }),
  authorizationActions)
export default class Authorization extends Component {
  static propTypes = {
    callback: PropTypes.string,
    loading: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    JWT: PropTypes.string,
    sendAuthorizationRequest: PropTypes.func,
    socketConnected: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object,
    waitForAuthorizationResponse: PropTypes.func
  }
  state = {
    showStark: true
  };
  componentDidMount() {
    this.props.sendAuthorizationRequest();
  }
  componentDidUpdate() {
    const { callback, socketConnected, token, waitForAuthorizationResponse } = this.props;
    if (token && !socketConnected) {
      waitForAuthorizationResponse(token, callback);
    }
  }
  render() {
    const { JWT, loading } = this.props;
    const QR = QRUtil.getQRDataURI(JWT);
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Authorization</h1>
        <Helmet title="authorization" />
        <div className={styles.centered}>
          <img src={QR} alt="Authorization QR code" />
        </div>
        <Loading show={loading} />
      </div>
    );
  }
}
