import {RegisterForm} from 'components';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import * as widgetActions from 'redux/modules/widgets';
import {load} from 'redux/modules/widgets';


@connect(
  state => ({
    widgets: state.widgets.data,
    editing: state.widgets.editing,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  {...widgetActions, initialize})
export default class Register extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }
  handleInitialize = () => {
    this.props.initialize('Register', {
      name: 'Vito Corleone',
      phone: '0912345678',
      privateKey: 'privateKey',
      publicKey: 'publicKey',
      address: 'address'
    });
  }
  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <Helmet title="Register"/>
        <button className="btn btn-success" onClick={load}>
          GoButton
        </button>
        <RegisterForm/>
      </div>
    );
  }
}
