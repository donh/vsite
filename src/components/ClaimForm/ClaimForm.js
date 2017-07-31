import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as claimActions from 'redux/modules/claim';

@connect(() => ({}),
  dispatch => bindActionCreators(claimActions, dispatch)
)
@reduxForm({
  form: 'claim',
  fields: ['name', 'ID', 'gender', 'issueDate', 'expiryDate', 'authority'],
  asyncBlurFields: ['email']
})
export default
class ClaimForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {name, ID, gender, issueDate, expiryDate, authority},
      handleSubmit,
      resetForm,
      } = this.props;
    const styles = require('./ClaimForm.scss');
    const renderInput = (field, label) =>
      <div className={'form-group'}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(ID, 'ID')}
          {renderInput(gender, 'Gender')}
          {renderInput(issueDate, 'Date of Issue')}
          {renderInput(expiryDate, 'Date of Expire')}
          {renderInput(authority, 'Authority')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
