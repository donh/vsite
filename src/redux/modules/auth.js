const LOAD = 'vchain/auth/LOAD';
const LOAD_SUCCESS = 'vchain/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'vchain/auth/LOAD_FAIL';
const LOGIN = 'vchain/auth/LOGIN';
const LOGIN_SUCCESS = 'vchain/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'vchain/auth/LOGIN_FAIL';
const LOGOUT = 'vchain/auth/LOGOUT';
const LOGOUT_SUCCESS = 'vchain/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'vchain/auth/LOGOUT_FAIL';
const TOKEN = 'vchain/auth/TOKEN';
const TOKEN_SUCCESS = 'vchain/auth/TOKEN_SUCCESS';
const TOKEN_FAIL = 'vchain/auth/TOKEN_FAIL';
const SESSION = 'vchain/auth/SESSION';
const SESSION_SUCCESS = 'vchain/auth/SESSION_SUCCESS';
const SESSION_FAIL = 'vchain/auth/SESSION_FAIL';

const initialState = {
  loaded: false,
  loading: true,
  loggingIn: false,
  JWT: '',
  token: null,
  user: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case TOKEN:
      return {
        ...state
      };
    case TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        JWT: action.result.JWT,
        token: action.result.token
      };
    case TOKEN_FAIL:
      console.log('TOKEN_FAIL action =', action);
      return {
        ...state,
        loading: false
      };
    case SESSION:
      return {
        ...state
      };
    case SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loggingIn: true,
        user: action.result
      };
    case SESSION_FAIL:
      return {
        ...state,
        loading: false,
        loggingIn: false,
        user: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise(client) {
      return client.get('/loadAuth');
    }
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise(client) {
      return client.post('/login', {
        data: { name }
      });
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise(client) {
      return client.get('/logout');
    }
  };
}

export function sendLoginRequest() {
  return {
    types: [TOKEN, TOKEN_SUCCESS, TOKEN_FAIL],
    promise(client) {
      return client.post('/token');
    }
  };
}

export function waitForLoginResponse(token) {
  return {
    types: [SESSION, SESSION_SUCCESS, SESSION_FAIL],
    promise(client) {
      return client.post('/session', {
        data: {
          socketToken: token
        }
      });
    }
  };
}
