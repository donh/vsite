import {Loading} from 'components';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as claimActions from 'redux/modules/claim';
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
    const {loading, JWT} = this.props;
    const QR = QRUtil.getQRDataURI(JWT);
    return (
      <div className="container">
        <h1>Claim</h1>
        <Helmet title="Claim"/>
        <div>
          <img src={QR} />
        </div>
        <Loading show={loading} />
      </div>
    );
  }
}
