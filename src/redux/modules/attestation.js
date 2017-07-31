import page from 'page';
import qs from 'qs';

const ATTEST = 'vchain/attestation/ATTEST';
const ATTEST_SUCCESS = 'vchain/attestation/ATTEST_SUCCESS';
const ATTEST_FAIL = 'vchain/attestation/ATTEST_FAIL';
const GET_CLAIMS = 'vchain/attestation/GET_CLAIMS';
const GET_CLAIMS_SUCCESS = 'vchain/attestation/GET_CLAIMS_SUCCESS';
const GET_CLAIMS_FAIL = 'vchain/attestation/GET_CLAIMS_FAIL';
const ATTEST_URL = 'vchain/attestation/ATTEST_URL';
const ATTEST_URL_SUCCESS = 'vchain/attestation/ATTEST_URL_SUCCESS';
const ATTEST_URL_FAIL = 'vchain/attestation/ATTEST_URL_FAIL';

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
      const {attested, index} = action.result;
      const claims = [];
      state.claims.map((claim, key) => {
        if (key !== index) {
          claims.push(claim);
        } else if (!attested) {
          claims.push(claim);
        }
      });
      return {
        ...state,
        attested: attested,
        claims: claims,
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
      const {currentPage, pages, result, total} = action.result;
      const query = qs.parse(location.search.slice(1), {delimiter: '&'});
      const pageInput = ('page' in query) ? +query.page : 1;
      if (pageInput !== currentPage) {
        const path = `${window.location.pathname}?page=${currentPage}`;
        page.redirect(path);
      }
      return {
        ...state,
        attested: false,
        claims: result,
        countOfClaims: total,
        currentPage: currentPage,
        loading: false,
        pages: pages
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
    promise: (client) => client.post('/attest', {
      data: {
        claim: claim,
        key: key,
        status: status
      }
    })
  };
}

export function getPendingClaims(currentPage) {
  return {
    types: [GET_CLAIMS, GET_CLAIMS_SUCCESS, GET_CLAIMS_FAIL],
    promise: (client) => client.get(`/attestation?page=${currentPage}`)
  };
}

export function parseURL() {
  const query = qs.parse(location.search.slice(1), {delimiter: '&'});
  const pageInput = ('page' in query) ? +query.page : 1;
  return {
    types: [ATTEST_URL, ATTEST_URL_SUCCESS, ATTEST_URL_FAIL],
    promise: () => {
      return new Promise((resolve) => {
        resolve(pageInput);
      });
    }
  };
}
