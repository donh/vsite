import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SurveyForm} from 'components';

@connect(
  () => ({}),
  {initialize})
export default class Survey extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  handleInitialize = () => {
    console.log('handleInitialize');
    this.props.initialize('survey', {
      name: '令狐冲',
      ID: '110116199001011712',
      gender: '男',
      issueDate: '2015年7月15日',
      expiryDate: '2025年7月15日',
      authority: '陝西華山'
      // name: '令狐冲',
      // ID: '110116199001011712',
      // gender: '男',
      // race: '漢族',
      // birth: '1992年8月7日',
      // address: '華山思過崖',
      // authority: '陝西華山',
      // expire: '2025年7月15日'
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Claim</h1>
        <Helmet title="Claim"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <SurveyForm />
      </div>
    );
  }
}
