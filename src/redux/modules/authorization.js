import qs from 'qs';

const AUTHORIZATION_TOKEN = 'vchain/authorization/AUTHORIZATION_TOKEN';
const AUTHORIZATION_TOKEN_SUCCESS = 'vchain/authorization/AUTHORIZATION_TOKEN_SUCCESS';
const AUTHORIZATION_TOKEN_FAIL = 'vchain/authorization/AUTHORIZATION_TOKEN_FAIL';
const AUTHORIZATION = 'vchain/authorization/AUTHORIZATION';
const AUTHORIZATION_SUCCESS = 'vchain/authorization/AUTHORIZATION_SUCCESS';
const AUTHORIZATION_FAIL = 'vchain/authorization/AUTHORIZATION_FAIL';

const initialState = {
  callback: '',
  loading: true,
  JWT: '',
  socketConnected: false,
  token: null,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTHORIZATION_TOKEN:
      return {
        ...state
      };
    case AUTHORIZATION_TOKEN_SUCCESS:
      const {callback, JWT, token} = action.result;
      return {
        ...state,
        loading: false,
        callback: callback,
        JWT: JWT,
        token: token
      };
    case AUTHORIZATION_TOKEN_FAIL:
      console.log('AUTHORIZATION_TOKEN_FAIL action =', action);
      return {
        ...state,
        loading: false
      };
    case AUTHORIZATION:
      return {
        ...state,
        socketConnected: true,
      };
    case AUTHORIZATION_SUCCESS:
      window.location.href = action.result;
      return {
        ...state,
      };
    case AUTHORIZATION_FAIL:
      console.log('AUTHORIZATION_FAIL action =', action);
      return {
        ...state,
        loading: false,
        loggingIn: false,
        socketConnected: true,
        user: null
      };
    default:
      return state;
  }
}

export function sendAuthorizationRequest() {
  const query = qs.parse(location.search.slice(1), {delimiter: '&'});
  const {requester, scope, callback} = query;
  return {
    types: [AUTHORIZATION_TOKEN, AUTHORIZATION_TOKEN_SUCCESS, AUTHORIZATION_TOKEN_FAIL],
    promise: (client) => client.get(`/authorizationToken?requester=${requester}&scope=${scope}&callback=${callback}`)
  };
}

export function waitForAuthorizationResponse(token, callback) {
  return {
    types: [AUTHORIZATION, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL],
    promise: (client) => client.post('/authorization', {
      data: {
        callback: callback,
        socketToken: token
      }
    })
  };
}
