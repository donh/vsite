import React, { Component, PropTypes } from 'react';
import styles from './Loading.scss';

export default class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  }

  render() {
    const style = {
      display: this.props.show ? 'block' : 'none'
    };
    const catStyle = {
      display: this.props.show ? 'block' : 'none',
      position: 'absolute',
      margin: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const left = `$(styles.legs} $(styles.left}`;
    const right = `$(styles.legs} $(styles.right}`;
    return (
      <div className={styles.loadingContainer} style={style}>
        <div className={styles.loadingCat}>
          <div className={styles.body} />
          <div className={styles.head}>
            <div className={styles.face} />
          </div>
          <div className={styles.foot}>
            <div className={styles.tummyEnd} />
            <div className={styles.bottom} />
            <div className={left} />
            <div className={right} />
          </div>
          <div className={left} />
          <div className={right} />
        </div>
        <img className={styles.center} style={catStyle} src="/cat.gif" alt="Loading data..." />
      </div>
    );
  }
}
