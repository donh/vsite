import fs from 'fs';
import {TokenSigner} from 'jsontokens';
import {decodeToken} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function attestation(req) {
  const page = ('page' in req.query) ? req.query.page : 1;
  return new Promise((resolve, reject) => {
    const URL = `${config.getClaims}?page=${page}`;
    console.log('URL =', URL);
    superagent
        .get(URL)
        .end((err, res) => {
          if (err) {
            console.log('superagent err =', err);
            reject(err);
          } else {
            const resp = JSON.parse(res.text);
            const {result} = resp;
            const claims = result.map((item, key) => {
              const claim = {};
              if (item.claim.length) {
                const {payload} = decodeToken(item.claim)
                const {context} = payload
                const {authority, expiryDate, gender, ID, issueDate, name, userProxy} = context
                claim.claimID = item.claimID;
                claim.name = name;
                claim.ID = ID;
                claim.gender = gender;
                claim.issueDate = issueDate;
                claim.expiryDate = expiryDate;
                claim.authority = authority;
                claim.proxy = userProxy;
              }
              return claim;
            })
            resp.result = claims;
            resolve(resp);
          }
        });
  });
}
