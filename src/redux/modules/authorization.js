import qs from 'qs';

const AUTHORIZATION_TOKEN = 'idhub/authorization/AUTHORIZATION_TOKEN';
const AUTHORIZATION_TOKEN_SUCCESS = 'idhub/authorization/AUTHORIZATION_TOKEN_SUCCESS';
const AUTHORIZATION_TOKEN_FAIL = 'idhub/authorization/AUTHORIZATION_TOKEN_FAIL';
const AUTHORIZATION = 'idhub/authorization/AUTHORIZATION';
const AUTHORIZATION_SUCCESS = 'idhub/authorization/AUTHORIZATION_SUCCESS';
const AUTHORIZATION_FAIL = 'idhub/authorization/AUTHORIZATION_FAIL';

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
      return {
        ...state,
        loading: false,
        callback: action.result.callback,
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
  const query = qs.parse(location.search.slice(1), { delimiter: '&' });
  const { requester, scope, callback } = query;
  const path = `/authorizationToken?requester=${requester}&scope=${scope}&callback=${callback}`;
  return {
    types: [AUTHORIZATION_TOKEN, AUTHORIZATION_TOKEN_SUCCESS, AUTHORIZATION_TOKEN_FAIL],
    promise(client) {
      return client.get(path);
    }
  };
}

export function waitForAuthorizationResponse(token, callback) {
  return {
    types: [AUTHORIZATION, AUTHORIZATION_SUCCESS, AUTHORIZATION_FAIL],
    promise(client) {
      return client.post('/authorization', {
        data: {
          callback,
          socketToken: token
        }
      });
    }
  };
}
