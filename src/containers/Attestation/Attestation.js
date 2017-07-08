import {Pagination} from 'components';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as attestationActions from 'redux/modules/attestation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
injectTapEventPlugin();

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
  // componentWillMount() {
  //   injectTapEventPlugin();
  // }
  componentDidMount() {
    this.props.getPendingClaims(1);
  }
  render() {
    const {
      claims,
      // countOfClaims,
      currentPage,
      getPendingClaims,
      pages
    } = this.props;
    // console.log('countOfClaims =', countOfClaims);
    // console.log('currentPage =', currentPage);
    // console.log('pages =', pages);
    const styles = require('./Attestation.scss');
    const style = {
      margin: 12
    };
    // const rows = claims.map((claim) => {
    const rows = claims.map((claim, key) => {
      const {name, ID, gender, authority, issueDate, expiryDate} = claim;
      return (
        <TableRow key={key}>
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
    return (
      <div className={styles.attestation + ' container'}>
        <h1>Attestation</h1>
        <Helmet title="Attestation"/>
        <Pagination initialPage={0} currentPage={currentPage}
         total={pages} onPageChange={getPendingClaims} />

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
