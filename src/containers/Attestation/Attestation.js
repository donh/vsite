import {Pagination} from 'components';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as attestationActions from 'redux/modules/attestation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
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
    // console.log('componentDidMount()');
    this.props.getPendingClaims();
    // console.log('this.props.getPendingClaims() =', this.props.getPendingClaims());
  }
  // handlePagination: (page) => {
  handlePagination(page) {
    console.log('handlePagination() page =', page);
    // const {currentPage} = OWL.state.apollo
    // if (page !== currentPage) {
    //   OWL.actions.setApolloLoading()
    //   OWL.actions.clearApolloChartsData()
    //   OWL.actions.setApolloCurrentPage(page)
    //   OWL.actions.setApolloURL()
    //   OWL.actions.setApolloPaginatedHostnames()
    //   OWL.actions.getApolloChartsData()
    // }
  }
  render() {
    const {
      claims,
      countOfClaims,
      currentPage,
      pages
    } = this.props;
    // console.log('claims =', claims);
    console.log('countOfClaims =', countOfClaims);
    console.log('currentPage =', currentPage);
    console.log('pages =', pages);
    const styles = require('./Attestation.scss');
    const style = {
      margin: 12
    };
    // const rows = claims.map((claim, key) => {
    const rows = claims.map((claim) => {
      const {name, ID, gender, authority, issueDate, expiryDate} = claim;
      return (
        <TableRow>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{ID}</TableRowColumn>
          <TableRowColumn>{gender}</TableRowColumn>
          <TableRowColumn>{authority}</TableRowColumn>
          <TableRowColumn>{issueDate}</TableRowColumn>
          <TableRowColumn>{expiryDate}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="APPROVE" primary={true} style={style} />
          </TableRowColumn>
        </TableRow>
      );
    });
// <Pagination />
    return (
      <div className={styles.attestation + ' container'}>
        <h1>Attestation</h1>
        <Helmet title="Attestation"/>
        <Pagination initialPage={0} currentPage={currentPage}
         total={pages} onPageChange={this.handlePagination} />

        <MuiThemeProvider>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Gender</TableHeaderColumn>
                <TableHeaderColumn>Authority</TableHeaderColumn>
                <TableHeaderColumn>Issue Date</TableHeaderColumn>
                <TableHeaderColumn>Expiry Date</TableHeaderColumn>
                <TableHeaderColumn>action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {rows}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }
}
