import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as registerActions from 'redux/modules/register';

@connect(
  state => ({
    registration: state.register.registration,
    saveError: state.register.saveError
  }),
  registerActions)

export default class Register extends Component {
  static propTypes = {
    registration: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    saveError: PropTypes.object.isRequired
  }
  registerUser = (evn) => {
    evn.preventDefault();
    const {name, phone, privateKey, publicKey, address} = this.refs;
    const param = {
      name: name.value,
      phone: phone.value,
      privateKey: privateKey.value,
      publicKey: publicKey.value,
      address: address.value
    };
    this.props.save(param);
  }
  // handleInitialize = () => {
  //   this.props.initialize('Register', {
  //     name: 'Vito Corleone',
  //     phone: '0912345678',
  //     privateKey: 'privateKey',
  //     publicKey: 'publicKey',
  //     address: 'address'
  //   });
  // }
  render() {
    const {registration} = this.props;
    console.log('registration =', registration);
    const styles = require('./Register.scss');
    const fields = ['name', 'phone', 'privateKey', 'publicKey', 'address'];
    const titles = ['Full Name', 'Phone', 'Private Key', 'Public Key', 'Address'];
    const renderInput = fields.map((field, key) => {
      return (
        <div key={`registration-form-input-${key}`} className={'form-group'}>
          <label htmlFor={field} className="col-sm-2">{titles[key]}</label>
          <div className={'col-sm-8 ' + styles.inputGroup}>
            <input ref={field} type="text" className="form-control" id={field} />
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <h1>Register</h1>
        <Helmet title="Register"/>

        <form className="form-horizontal" ref="registerationForm">
          {renderInput}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={this.registerUser}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
