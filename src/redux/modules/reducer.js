import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import attestation from './attestation';
import auth from './auth';
import authorization from './authorization';
import claim from './claim';
import {reducer as form} from 'redux-form';
import info from './info';
import thirdParty from './thirdParty';
import register from './register';

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
