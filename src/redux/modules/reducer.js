import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
import attestation from './attestation';
import auth from './auth';
import authorization from './authorization';
import claim from './claim';
import info from './info';
import register from './register';
import thirdParty from './thirdParty';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  attestation,
  auth,
  authorization,
  claim,
  form,
  info,
  thirdParty,
  register
});
