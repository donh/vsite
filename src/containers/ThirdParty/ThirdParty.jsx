import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as thirdPartyActions from 'redux/modules/thirdParty';
import styles from './ThirdParty.scss';

@connect(
  state => ({
    query: state.thirdParty.query
  }),
  thirdPartyActions)
export default class ThirdParty extends Component {
  static propTypes = {
    parseURL: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.parseURL();
  }
  requestAuthorization = () => {
    const requester = 'Citi';
    const scope = 'ID';
    const callback = encodeURIComponent('/third-party');
    const destination = '/authorization';
    const URL = `${destination}?requester=${requester}&scope=${scope}&callback=${callback}`;
    window.location.href = URL;
  }
  render() {
    const { query } = this.props;
    if (Object.keys(query).length === 0) {
      return (
        <div className={`${styles.loginPage} container`}>
          <h1>Third Party</h1>
          <Helmet title="Third Party" />

          <br />
          <br />
          <br />
          <center>
            <button className="btn btn-success" onClick={this.requestAuthorization}>
              Request ID Authorization
            </button>
          </center>
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    }
    return (
      <div className={`${styles.loginPage} container`}>
        <h1>Third Party</h1>
        <Helmet title="Third Party" />

        <AuthorizationForm query={query} />
      </div>
    );
  }
}

class AuthorizationForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  }
  render() {
    const { fields: { name, ID, gender, issueDate, expiryDate, authority }, query } = this.props;
    const renderInput = (field, label) =>
      <div className={'form-group'}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={`col-sm-8 ${styles.inputGroup}`}>
          <input
            ref={field.name} value={query[field.name]} type="text"
            className="form-control" id={field.name} {...field}
          />
        </div>
      </div>;
    return (
      <form className="form-horizontal">
        {renderInput(name, 'Full Name')}
        {renderInput(ID, 'ID')}
        {renderInput(gender, 'Gender')}
        {renderInput(issueDate, 'Date of Issue')}
        {renderInput(expiryDate, 'Date of Expire')}
        {renderInput(authority, 'Authority')}
      </form>
    );
  }
}

AuthorizationForm = reduxForm({
  form: 'authorization',
  fields: ['name', 'ID', 'gender', 'issueDate', 'expiryDate', 'authority']
})(AuthorizationForm);
