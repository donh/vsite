const SAVE = 'vchain/register/SAVE';
const SAVE_SUCCESS = 'vchain/register/SAVE_SUCCESS';
const SAVE_FAIL = 'vchain/register/SAVE_FAIL';

const initialState = {
  registration: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return state;
    case SAVE_SUCCESS:
      return {
        ...state,
        registration: action.result,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      console.log('register reducer SAVE_FAIL');
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

export function save(register) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: register.id,
    promise: (client) => client.post('/register', {
      data: register
    })
  };
}
