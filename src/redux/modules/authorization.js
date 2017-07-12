import qs from 'qs';

const AUTHORIZATION_TOKEN = 'vchain/authorization/AUTHORIZATION_TOKEN';
const AUTHORIZATION_TOKEN_SUCCESS = 'vchain/authorization/AUTHORIZATION_TOKEN_SUCCESS';
const AUTHORIZATION_TOKEN_FAIL = 'vchain/authorization/AUTHORIZATION_TOKEN_FAIL';
const AUTHORIZATION = 'vchain/authorization/AUTHORIZATION';
const AUTHORIZATION_SUCCESS = 'vchain/authorization/AUTHORIZATION_SUCCESS';
const AUTHORIZATION_FAIL = 'vchain/authorization/AUTHORIZATION_FAIL';

const initialState = {
  loading: true,
  JWT: '',
  socketConnected: false,
  token: null,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTHORIZATION_TOKEN:
      console.log('AUTHORIZATION_TOKEN action =', action);
      return {
        ...state
      };
    case AUTHORIZATION_TOKEN_SUCCESS:
      console.log('AUTHORIZATION_TOKEN_SUCCESS action =', action);
      return {
        ...state,
        loading: false,
        JWT: action.result.JWT,
        token: action.result.token
      };
    case AUTHORIZATION_TOKEN_FAIL:
      console.log('AUTHORIZATION_TOKEN_FAIL action =', action);
      return {
        ...state,
        loading: false
      };
    case AUTHORIZATION:
      console.log('AUTHORIZATION action =', action);
      return {
        ...state,
        socketConnected: true,
      };
    case AUTHORIZATION_SUCCESS:
      console.log('AUTHORIZATION_SUCCESS action =', action);
      return {
        ...state,
        loading: false,
        loggingIn: true,
        socketConnected: true,
        user: action.result
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
  console.log('sendAuthorizationRequest()');
  const query = qs.parse(location.search.slice(1), {delimiter: '&'});
  console.log('query =', query);
  const {requester, scope} = query;
  return {
    types: [AUTHORIZATION_TOKEN, AUTHORIZATION_TOKEN_SUCCESS, AUTHORIZATION_TOKEN_FAIL],
    promise: (client) => client.get(`/authorizationToken?requester=${requester}&scope=${scope}`)
  };
}

export function waitForAuthorizationResponse(token) {
  console.log('waitForAuthorizationResponse(token) =', token);
  return {
    types: [AUTHORIZATION, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL],
    promise: (client) => client.post('/authorization', {
      data: {
        socketToken: token
      }
    })
  };
}
