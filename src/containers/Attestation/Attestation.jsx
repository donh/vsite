import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as attestationActions from 'redux/modules/attestation';
import styles from './Attestation.scss';
import { Loading, Pagination } from '../../components';

injectTapEventPlugin();

@connect(
  state => ({
    attested: state.attestation.attested,
    claims: state.attestation.claims,
    countOfClaims: state.attestation.countOfClaims,
    currentPage: state.attestation.currentPage,
    loading: state.attestation.loading,
    pages: state.attestation.pages
  }),
  attestationActions)
export default class Attestation extends Component {
  static propTypes = {
    attest: PropTypes.func.isRequired,
    attested: PropTypes.bool,
    claims: PropTypes.array,
    countOfClaims: PropTypes.number,
    currentPage: PropTypes.number,
    getPendingClaims: PropTypes.func.isRequired,
    parseURL: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    pages: PropTypes.number
  };
  // componentWillMount() {
  //   injectTapEventPlugin();
  // }
  componentDidMount() {
    this.loadPageData();
  }

  async loadPageData() {
    await this.props.parseURL();
    this.props.getPendingClaims(this.props.currentPage);
  }

  approve = (claim, key) => {
    this.props.attest(claim, 'APPROVED', key);
  }
  reject(claim, key) {
    this.props.attest(claim, 'REJECTED', key);
  }
  render() {
    const {
      claims,
      // countOfClaims,
      currentPage,
      getPendingClaims,
      loading,
      pages
    } = this.props;
    const rows = claims.map((claim, key) => {
      const { name, ID, gender, authority, issueDate, expiryDate } = claim;
      return (
        <TableRow key={key}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{ID}</TableRowColumn>
          <TableRowColumn>{gender}</TableRowColumn>
          <TableRowColumn>{authority}</TableRowColumn>
          <TableRowColumn>{issueDate}</TableRowColumn>
          <TableRowColumn>{expiryDate}</TableRowColumn>
          <TableRowColumn>
            <div className={styles.buttonApprove} onClick={() => this.approve(claim, key)}>Yes</div>
            <div className={styles.buttonReject} onClick={() => this.reject(claim, key)}>No</div>
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className={`${styles.attestation} container`}>
        <h1>Attestation</h1>
        <Helmet title="Attestation" />
        <Pagination
          initialPage={0} currentPage={currentPage}
          total={pages} onPageChange={getPendingClaims}
        />

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
        <Loading show={loading} />
      </div>
    );
  }
}
