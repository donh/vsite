import React, {Component, PropTypes} from 'react';

export default class Loading extends Component {
  static propTypes = {
    clickStarkLoginButton: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  }
  state = {
    clicked: false
  };
  clickButton = () => {
    this.setState({clicked: true});
    this.props.clickStarkLoginButton();
  }
  render() {
    const show = this.props.show && !this.state.clicked;
    const styles = require('./Stark.scss');
    const style = {
      display: show ? 'block' : 'none'
    };
    return (
      <div className={styles.StarkContainer} style={style}>
        <div id={styles.logo}>
          <div className={styles.title}>STARK INDUSTRIES</div>
        </div>
        <div className={styles.starkLogin}>
          <div className={styles.loginBox}>
            <div className={styles.starkButton} onClick={this.clickButton}>Log In</div>
          </div>
          <div className={styles.hexagons}>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <br />
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <br />
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <br />
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <br />
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
            <span>&#x2B22;</span>
          </div>
        </div>
        <div id={styles.circle1}>
          <div id={styles.innerCirlce1}></div>
        </div>
      </div>
    );
  }
}
