import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

@connect(
    // state => ({info: state.info.data}),
    state => ({info: state.loading.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class Loading extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Lodaing.scss');
      // <div className={styles.infoBar + ' well'}>
      //   <div className="container">
      //     This is an info bar
      //     {' '}
      //     <strong>{info ? info.message : 'no info!'}</strong>
      //     <span className={styles.time}>{info && new Date(info.time).toString()}</span>
      //     <button className="btn btn-primary" onClick={load}>Reload from server</button>
      //   </div>
      // </div>
    return (
      <div>
        <div className="loading-cat">
          <div className="body"></div>
          <div className="head">
            <div className="face"></div>
          </div>
          <div className="foot">
            <div className="tummy-end"></div>
            <div className="bottom"></div>
            <div className="legs left"></div>
            <div className="legs right"></div>
          </div>
          <div className="hands left"></div>
          <div className="hands right"></div>
        </div>
        <img alt="" src="https://media.giphy.com/media/3o7TKtbdY5oZuiyucg/giphy.gif" />
      </div>
    );
  }
}
