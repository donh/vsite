const LOAD = 'vchain/attestation/LOAD';
const LOAD_SUCCESS = 'vchain/attestation/LOAD_SUCCESS';
const LOAD_FAIL = 'vchain/attestation/LOAD_FAIL';
const SAVE = 'vchain/attestation/SAVE';
const SAVE_SUCCESS = 'vchain/attestation/SAVE_SUCCESS';
const SAVE_FAIL = 'vchain/attestation/SAVE_FAIL';

const initialState = {
  loaded: false,
  saveError: {},
  submission: null
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.attestation && globalState.attestation.loaded;
}

export function load() {
  console.log('ATTESTATION load()');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/attestation/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(attestation) {
  console.log('ATTESTATION save(attestation) =', attestation);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: attestation.id,
    promise: (client) => client.post('/attestation/update', {
      data: attestation
    })
  };
}
