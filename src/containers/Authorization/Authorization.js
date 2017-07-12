import {Loading} from 'components';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as authorizationActions from 'redux/modules/authorization';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    loading: state.authorization.loading,
    JWT: state.authorization.JWT,
    socketConnected: state.authorization.socketConnected,
    token: state.authorization.token,
    user: state.authorization.user
  }),
  authorizationActions)
export default class Authorization extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    JWT: PropTypes.string,
    // parseURL: PropTypes.func,
    sendAuthorizationRequest: PropTypes.func,
    socketConnected: PropTypes.bool,
    token: PropTypes.string,
    user: PropTypes.object,
    waitForAuthorizationResponse: PropTypes.func
  }
  state = {
    // showLoadingAndQRCode: false,
    showStark: true
  };
  componentDidMount() {
    this.props.sendAuthorizationRequest();
    // this.props.sendAuthorizationRequest('ID');
    // this.props.sendAuthorizationRequest(scope);
    // this.props.sendLoginRequest();
  }
  componentDidUpdate() {
    const {socketConnected, token, waitForAuthorizationResponse} = this.props;
    // const {token, user, waitForAuthorizationResponse} = this.props;
    // if (token && !user) {

    if (token && !socketConnected) {
      waitForAuthorizationResponse(token);
    }
  }
  render() {
    // const {JWT, loading, logout, user} = this.props;
    const {JWT, loading} = this.props;
    const styles = require('./Authorization.scss');
    const QR = QRUtil.getQRDataURI(JWT);
    // const {showLoadingAndQRCode, showStark} = this.state;
    const {showLoadingAndQRCode} = this.state;
    const loadingClassName = showLoadingAndQRCode ? '' : 'hide';
    // const QRCodeClassName = (showLoadingAndQRCode && !loading) ? '' : 'hide';
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Authorization</h1>
        <Helmet title="authorization"/>

        <div>
          <img src={QR} />
        </div>

        <div className={loadingClassName}>
          <Loading show={loading} />
        </div>
      </div>
    );
  }
}
