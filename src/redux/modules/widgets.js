const LOAD = 'vchain/widgets/LOAD';
const LOAD_SUCCESS = 'vchain/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'vchain/widgets/LOAD_FAIL';
const SAVE = 'vchain/widgets/SAVE';
const SAVE_SUCCESS = 'vchain/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'vchain/widgets/SAVE_FAIL';

const initialState = {
  loaded: false,
  saveError: {},
  registration: null
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
      console.log('widget reducer SAVE');
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      console.log('widget reducer SAVE_SUCCESS');
      console.log('SAVE_SUCCESS action.result =', action.result);
      return {
        ...state,
        registration: action.result,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      console.log('widget reducer SAVE_FAIL');
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
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  console.log('WIDGET load()');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  console.log('WIDGET save(widget) =', widget);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widget/update', {
      data: widget
    })
  };
}
