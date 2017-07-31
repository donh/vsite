import React, {Component, PropTypes} from 'react';

export default class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  }

  render() {
    const styles = require('./Loading.scss');
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
    return (
      <div className={styles.loadingContainer} style={style}>
        <div className={styles.loadingCat}>
          <div className={styles.body}></div>
          <div className={styles.head}>
            <div className={styles.face}></div>
          </div>
          <div className={styles.foot}>
            <div className={styles.tummyEnd}></div>
            <div className={styles.bottom}></div>
            <div className={`$(styles.legs} $(styles.left}`}></div>
            <div className={`$(styles.legs} $(styles.right}`}></div>
          </div>
          <div className={`$(styles.hands} $(styles.left}`}></div>
          <div className={`$(styles.hands} $(styles.right}`}></div>
        </div>
        <img className={styles.center} style={catStyle} src="/cat.gif" alt="Loading data..." />
      </div>
    );
  }
}
