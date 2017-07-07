import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as attestationActions from 'redux/modules/attestation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

@connect(
  state => ({
    claims: state.attestation.claims,
    countOfClaims: state.attestation.countOfClaims,
    currentPage: state.attestation.currentPage,
    pages: state.attestation.pages
  }),
  attestationActions)
export default class Attestation extends Component {
  static propTypes = {
    claims: PropTypes.array,
    countOfClaims: PropTypes.number,
    currentPage: PropTypes.number,
    pages: PropTypes.number,
    getPendingClaims: PropTypes.func.isRequired
  };
  componentDidMount() {
    console.log('componentDidMount()');
    this.props.getPendingClaims();
    console.log('this.props.getPendingClaims() =', this.props.getPendingClaims());
  }

  render() {
    const {
      claims,
      countOfClaims,
      currentPage,
      pages
    } = this.props;
    console.log('claims =', claims);
    console.log('countOfClaims =', countOfClaims);
    console.log('currentPage =', currentPage);
    console.log('pages =', pages);
    const styles = require('./Attestation.scss');
    return (
      <div className={styles.attestation + ' container'}>
        <h1>Attestation</h1>
        <Helmet title="Attestation"/>
        <MuiThemeProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
