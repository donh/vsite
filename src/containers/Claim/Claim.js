import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as claimActions from 'redux/modules/claim';
import { QRUtil } from '../../../lib/index';

@connect(
  state => ({
    JWT: state.claim.JWT
  }),
  claimActions)

export default class Cliam extends Component {
  static propTypes = {
    JWT: PropTypes.string,
    sendClaimRequest: PropTypes.func.isRequired
  };
  componentDidMount() {
    console.log('componentDidMount()');
    this.props.sendClaimRequest();
    console.log('this.props.sendClaimRequest() =', this.props.sendClaimRequest());
  }
  render() {
    const {JWT} = this.props;
    console.log('render() JWT =', JWT);
    const QR = QRUtil.getQRDataURI(JWT);
    return (
      <div className="container">
        <h1>Claim</h1>
        <Helmet title="Claim"/>
        <div>
          <img src={QR} />
        </div>
      </div>
    );
  }
}
