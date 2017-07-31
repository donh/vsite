import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import profileValidation from './profileValidation';
import * as surveyActions from 'redux/modules/survey';

function asyncValidate(data, dispatch, {isValidEmail}) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}
@connect(() => ({}),
  dispatch => bindActionCreators(surveyActions, dispatch)
)
@reduxForm({
  form: 'survey',
  fields: ['name', 'email', 'phone', 'id', 'privateKey', 'description'],
  validate: profileValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class ProfileForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      asyncValidating,
      dirty,
      fields: {name, email, phone, id, privateKey, description},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
    } = this.props;
    const styles = require('./ProfileForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div className={styles.flags}>
            {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {field.active && <span className={styles.active} title="Active">A</span>}
            {field.visited && <span className={styles.visited} title="Visited">V</span>}
            {field.touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email', true)}
          {renderInput(phone, 'Phone', true)}
          {renderInput(id, 'ID')}
          {renderInput(privateKey, 'Private Key')}
          {renderInput(description, 'Description')}
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

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Active Field</th>
              <td>{active}</td>
            </tr>
            <tr>
              <th>Dirty</th>
              <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Pristine</th>
              <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Valid</th>
              <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Invalid</th>
              <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
