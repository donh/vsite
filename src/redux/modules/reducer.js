import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import attestation from './attestation';
import auth from './auth';
import claim from './claim';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
// import register from './register';
import widgets from './widgets';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  attestation,
  auth,
  claim,
  form,
  info,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  pagination,
  // register,
  widgets
});
