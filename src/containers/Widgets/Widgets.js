import { WidgetForm } from 'components';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {initializeWithKey} from 'redux-form';
import * as widgetActions from 'redux/modules/widgets';

@connect(
  state => ({
    registration: state.widgets.registration,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  {...widgetActions, initializeWithKey })
export default class Widgets extends Component {
  static propTypes = {
    registration: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired
  };

  render() {
    const {
      registration,
      loading
    } = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Widgets.scss');
    console.log('registerUser() registration =', registration);
    return (
      <div className={styles.widgets + ' container'}>
        <h1>Register</h1>
        <Helmet title="Widgets"/>

        <WidgetForm />
      </div>
    );
  }
}

