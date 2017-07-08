import fs from 'fs';
import {TokenSigner} from 'jsontokens';
import {decodeToken} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function attestation(req) {
  return new Promise((resolve, reject) => {
    const URL = config.getClaims + '?page=2';
    console.log('URL =', URL);
    superagent
        .get(config.getClaims + '?page=2')
        .end((err, res) => {
          if (err) {
            console.log('superagent err =', err);
            reject(err);
          } else {
            const resp = JSON.parse(res.text);
            // const {count, currentPage, pages, result, time} = resp;
            const {result} = resp;
            // const claims = [];

            const claims = result.map((item, key) => {
              // console.log('item =', item);
              const claim = {};
              if (item.claim.length) {
                // const claim = decodeToken(item.claim)
                // console.log('claim =', claim);
                const {payload} = decodeToken(item.claim)
                // console.log('payload =', payload);
                const {context} = payload
                const {authority, expiryDate, gender, ID, issueDate, name, userProxy} = context
                claim.name = name;
                claim.ID = ID;
                claim.gender = gender;
                claim.issueDate = issueDate;
                claim.expiryDate = expiryDate;
                claim.authority = authority;
                claim.proxy = userProxy;
                // console.log('claim =', claim);
                // console.log('context =', context);
              }
              return claim;
            })
            // console.log('claims =', claims);
            resp.result = claims;
            // console.log('superagent pages =', pages);
            resolve(resp);
          }
        });
  });
}

// export function attestationGetClaims(req) {
//   console.log('GET /attestationGetClaims   config.getClaims =', config.getClaims);
//   return new Promise((resolve, reject) => {
//     const URL = config.getClaims + '?page=2';
//     console.log('URL =', URL);
//     superagent
//       .get(config.getClaims + '?page=2')
//       .end((err, res) => {
//         if (err) {
//           console.log('superagent err =', err);
//           reject(err);
//         } else {
//           console.log('superagent res =', res);
//           console.log('superagent res.body =', res.body);
//           const {result, time} = res.body;
//           console.log('superagent result =', result);
//           resolve(result);
//         }
//       });
//   });
// }
