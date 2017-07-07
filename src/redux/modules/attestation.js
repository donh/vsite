const LOAD = 'vchain/attestation/LOAD';
const LOAD_SUCCESS = 'vchain/attestation/LOAD_SUCCESS';
const LOAD_FAIL = 'vchain/attestation/LOAD_FAIL';
const SAVE = 'vchain/attestation/SAVE';
const SAVE_SUCCESS = 'vchain/attestation/SAVE_SUCCESS';
const SAVE_FAIL = 'vchain/attestation/SAVE_FAIL';
const GET_CLAIMS = 'vchain/attestation/GET_CLAIMS';
const GET_CLAIMS_SUCCESS = 'vchain/attestation/GET_CLAIMS_SUCCESS';
const GET_CLAIMS_FAIL = 'vchain/attestation/GET_CLAIMS_FAIL';

const initialState = {
  claims: [],
  countOfClaims: 0,
  currentPage: 1,
  pages: 1
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
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case SAVE:
      console.log('attestation reducer SAVE');
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      console.log('attestation reducer SAVE_SUCCESS');
      console.log('SAVE_SUCCESS action.result =', action.result);
      return {
        ...state,
        submission: action.result,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      console.log('attestation reducer SAVE_FAIL');
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case GET_CLAIMS:
      console.log('attestation reducer GET_CLAIMS');
      return state; // 'saving' flag handled by redux-form
    case GET_CLAIMS_SUCCESS:
      console.log('attestation reducer GET_CLAIMS_SUCCESS');
      console.log('SAVE_SUCCESS action =', action);
      console.log('SAVE_SUCCESS action.result =', action.result);
      const {currentPage, pages, result, total} = action.result;
      return {
        ...state,
        claims: result,
        currentPage: currentPage,
        pages: pages,
        countOfClaims: total,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case GET_CLAIMS_FAIL:
      console.log('attestation reducer GET_CLAIMS_FAIL');
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function getPendingClaims() {
  console.log('getPendingClaims()');
  return {
    types: [GET_CLAIMS, GET_CLAIMS_SUCCESS, GET_CLAIMS_FAIL],
    promise: (client) => client.get('/attestation')
  };
}
