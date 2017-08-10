import qs from 'qs';

const THIRDPARTY = 'vchain/thirdParty/THIRDPARTY';
const THIRDPARTY_SUCCESS = 'vchain/thirdParty/THIRDPARTY_SUCCESS';
const THIRDPARTY_FAIL = 'vchain/thirdParty/THIRDPARTY_FAIL';

const initialState = {
  query: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case THIRDPARTY:
      return {
        ...state,
        query: {}
      };
    case THIRDPARTY_SUCCESS:
      return {
        ...state,
        query: action.result
      };
    case THIRDPARTY_FAIL:
      console.log('THIRDPARTY_FAIL action =', action);
      return {
        ...state,
        query: {}
      };
    default:
      return state;
  }
}

export function parseURL() {
  const query = qs.parse(location.search.slice(1), { delimiter: '&' });
  return {
    types: [THIRDPARTY, THIRDPARTY_SUCCESS, THIRDPARTY_FAIL],
    promise() {
      return new Promise((resolve) => {
        resolve(query);
      });
    }
  };
}
