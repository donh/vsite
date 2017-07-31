const CLAIM_TOKEN = 'vchain/claim/CLAIM_TOKEN';
const CLAIM_TOKEN_SUCCESS = 'vchain/claim/CLAIM_TOKEN_SUCCESS';
const CLAIM_TOKEN_FAIL = 'vchain/claim/CLAIM_TOKEN_FAIL';

const initialState = {
  loading: true,
  JWT: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLAIM_TOKEN:
      return {
        ...state
      };
    case CLAIM_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        JWT: action.result.JWT,
        token: action.result.token
      };
    case CLAIM_TOKEN_FAIL:
      console.log('CLAIM_TOKEN_FAIL action =', action);
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function sendClaimRequest() {
  return {
    types: [CLAIM_TOKEN, CLAIM_TOKEN_SUCCESS, CLAIM_TOKEN_FAIL],
    promise: (client) => client.post('/claim/token')
  };
}
