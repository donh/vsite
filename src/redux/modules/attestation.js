import page from 'page';
import qs from 'qs';

const ATTEST = 'idhub/attestation/ATTEST';
const ATTEST_SUCCESS = 'idhub/attestation/ATTEST_SUCCESS';
const ATTEST_FAIL = 'idhub/attestation/ATTEST_FAIL';
const GET_CLAIMS = 'idhub/attestation/GET_CLAIMS';
const GET_CLAIMS_SUCCESS = 'idhub/attestation/GET_CLAIMS_SUCCESS';
const GET_CLAIMS_FAIL = 'idhub/attestation/GET_CLAIMS_FAIL';
const ATTEST_URL = 'idhub/attestation/ATTEST_URL';
const ATTEST_URL_SUCCESS = 'idhub/attestation/ATTEST_URL_SUCCESS';
const ATTEST_URL_FAIL = 'idhub/attestation/ATTEST_URL_FAIL';

const initialState = {
  attested: false,
  claims: [],
  countOfClaims: 0,
  currentPage: 1,
  loading: true,
  pages: 1
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ATTEST:
      return state;
    case ATTEST_SUCCESS:
      Object.keys(state.claims).forEach((key) => {
        if (key !== action.result.index) {
          action.result.claims.push(state.claims[key]);
        } else if (!action.result.attested) {
          action.result.claims.push(state.claims[key]);
        }
      });
      return {
        ...state,
        attested: action.result.attested,
        claims: action.result.claims,
        loading: false,
      };
    case ATTEST_FAIL:
      console.log('attestation reducer ATTEST_FAIL');
      return typeof action.error === 'string' ? {
        ...state,
        attested: false,
        loading: false
      } : state;
    case ATTEST_URL:
      return {
        ...state
      };
    case ATTEST_URL_SUCCESS:
      return {
        ...state,
        currentPage: action.result
      };
    case ATTEST_URL_FAIL:
      console.log('ATTEST_URL_FAIL action =', action);
      return {
        ...state,
        loading: true
      };
    case GET_CLAIMS:
      return state;
    case GET_CLAIMS_SUCCESS:
      return {
        ...state,
        attested: false,
        claims: action.result.result,
        countOfClaims: action.result.total,
        currentPage: action.result.currentPage,
        loading: false,
        pages: action.result.pages
      };
    case GET_CLAIMS_FAIL:
      console.log('attestation reducer GET_CLAIMS_FAIL');
      return typeof action.error === 'string' ? {
        ...state,
        attested: false,
        loading: false
      } : state;
    default:
      return state;
  }
}

export function attest(claim, status, key) {
  return {
    types: [ATTEST, ATTEST_SUCCESS, ATTEST_FAIL],
    promise(client) {
      return client.post('/attest', {
        data: {
          claim,
          key,
          status
        }
      });
    }
  };
}

export function getPendingClaims(currentPage) {
  const query = qs.parse(location.search.slice(1), { delimiter: '&' });
  const pageInput = ('page' in query) ? +query.page : 1;
  if (pageInput !== currentPage) {
    const path = `${window.location.pathname}?page=${currentPage}`;
    page.redirect(path);
  }
  return {
    types: [GET_CLAIMS, GET_CLAIMS_SUCCESS, GET_CLAIMS_FAIL],
    promise(client) {
      return client.get(`/attestation?page=${currentPage}`);
    }
  };
}

export function parseURL() {
  const query = qs.parse(location.search.slice(1), { delimiter: '&' });
  const pageInput = ('page' in query) ? +query.page : 1;
  return {
    types: [ATTEST_URL, ATTEST_URL_SUCCESS, ATTEST_URL_FAIL],
    promise() {
      return new Promise((resolve) => {
        resolve(pageInput);
      });
    }
  };
}
