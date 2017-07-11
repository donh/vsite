import fs from 'fs';
import {decodeToken, TokenSigner} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function attest(req) {
  return new Promise((resolve, reject) => {
    const {claim, key, status} = req.body;
    const {authority, claimID, expiryDate} = claim;
    const {gender, ID, issueDate, name, proxy} = claim;
    const URL = config.attest;
    const now = Math.floor(new Date().getTime() / 1000);
    const expired = now + (3 * 365 * 86400);
    const tokenPayload = {
      iss: config.attestant,
      aud: proxy,
      iat: now,
      exp: expired,
      sub: 'attestation',
      context: {
        attestantPublicKey: config.publicKey,
        attestantURL: config.attestantURL,
        authority: authority,
        expiryDate: expiryDate,
        gender: gender,
        ID: ID,
        issueDate: issueDate,
        name: name
      }
    };
    const rawPrivateKey = config.privateKey;
    const JWT = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
    const payload = {
      attestant: config.attestant,
      attestation: JWT,
      claimID: claimID,
      claimType: 'ID',
      proxy: proxy,
      status: status
    };
    superagent
      .post(URL)
      .send(payload)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('superagent err =', err);
          reject(err);
        } else {
          const {attested, result, time} = res.body;
          console.log('superagent attested =', attested);
          console.log('superagent result =', result);
          resolve({
            attested: attested,
            claimID: claimID,
            index: key
          });
        }
      });
  });
}
