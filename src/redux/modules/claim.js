const CLAIM_TOKEN = 'vchain/claim/CLAIM_TOKEN';
const CLAIM_TOKEN_SUCCESS = 'vchain/claim/CLAIM_TOKEN_SUCCESS';
const CLAIM_TOKEN_FAIL = 'vchain/claim/CLAIM_TOKEN_FAIL';

const initialState = {
  JWT: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLAIM_TOKEN:
      console.log('CLAIM_TOKEN action =', action);
      return {
        ...state
      };
    case CLAIM_TOKEN_SUCCESS:
      console.log('CLAIM_TOKEN_SUCCESS action =', action);
      return {
        ...state,
        JWT: action.result.JWT,
        token: action.result.token
      };
    case CLAIM_TOKEN_FAIL:
      console.log('CLAIM_TOKEN_FAIL action =', action);
      return {
        ...state
      };
    default:
      return state;
  }
}

export function sendClaimRequest() {
  console.log('sendClaimRequest()');
  return {
    types: [CLAIM_TOKEN, CLAIM_TOKEN_SUCCESS, CLAIM_TOKEN_FAIL],
    promise: (client) => client.post('/claim/token')
  };
}
