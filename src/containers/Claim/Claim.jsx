import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as claimActions from 'redux/modules/claim';
import styles from './Claim.scss';
import { Loading } from '../../components';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    loading: state.claim.loading,
    JWT: state.claim.JWT
  }),
  claimActions)

export default class Cliam extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    JWT: PropTypes.string,
    sendClaimRequest: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.sendClaimRequest();
  }
  render() {
    const { loading, JWT } = this.props;
    const QR = QRUtil.getQRDataURI(JWT);
    return (
      <div className="container">
        <h1>Claim</h1>
        <Helmet title="Claim" />
        <div className={styles.centered}>
          <img src={QR} alt="Claim QR code" />
        </div>
        <Loading show={loading} />
      </div>
    );
  }
}
