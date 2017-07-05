import { AttestationForm } from 'components';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {initializeWithKey} from 'redux-form';
import * as attestationActions from 'redux/modules/attestation';

@connect(
  state => ({
    // submission: state.attestation.submission,
    // error: state.attestation.error,
    loading: state.attestation.loading
  }),
  {...attestationActions, initializeWithKey })
export default class Attestation extends Component {
  static propTypes = {
    // submission: PropTypes.object,
    // error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired
  };

  render() {
    const {
      // submission,
      loading
    } = this.props;
    // const refreshClassName = 'fa fa-refresh';
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Attestation.scss');
    // console.log('registerUser() registration =', registration);
    return (
      <div className={styles.attestation + ' container'}>
        <h1>Attestation</h1>
        <Helmet title="Attestation"/>

        <AttestationForm />
      </div>
    );
  }
}
