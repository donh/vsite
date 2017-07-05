import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation from './widgetValidation';
import * as widgetActions from 'redux/modules/widgets';

@connect(
  state => ({
    saveError: state.widgets.saveError
  }),
  dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
  form: 'widget',
  fields: ['name', 'phone', 'privateKey', 'publicKey', 'address'],
  validate: widgetValidation
})
export default class WidgetForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired
  };
  registerUser = (evn) => {
    evn.preventDefault();
    const {name, phone, privateKey, publicKey, address} = this.refs;
    const param = {
      name: name.value,
      phone: phone.value,
      privateKey: privateKey.value,
      publicKey: publicKey.value,
      address: address.value
    };
    this.props.save(param);
  }
  render() {
    const {
      fields: {name, phone, privateKey, publicKey, address}
    } = this.props;
    const styles = require('components/WidgetForm/WidgetForm.scss');
    const renderInput = (field, label, content) =>
      <div className={'form-group'}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          <input ref={field.name} value={content} type="text" className="form-control" id={field.name} {...field}/>
        </div>
      </div>;
    return (
      <div>
        <form className="form-horizontal" ref="registerationForm">
          {renderInput(name, 'Full Name', '')}
          {renderInput(phone, 'Phone', '')}
          {renderInput(privateKey, 'Private Key', '')}
          {renderInput(publicKey, 'Public Key', '')}
          {renderInput(address, 'Address', '')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={this.registerUser}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
