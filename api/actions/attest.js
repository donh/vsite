import fs from 'fs';
import path from 'path';
import { TokenSigner } from 'jsontokens';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../cfg.json'), 'utf-8'));

export default function attest(req) {
  return new Promise((resolve, reject) => {
    const { claim, key, status } = req.body;
    const { authority, claimID, expiryDate } = claim;
    const { gender, ID, issueDate, name, proxy } = claim;
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
        authority,
        // authority: authority,
        // expiryDate: expiryDate,
        expiryDate,
        // gender: gender,
        gender,
        ID,
        issueDate,
        name
      }
    };
    const rawPrivateKey = config.privateKey;
    const JWT = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
    const payload = {
      attestant: config.attestant,
      attestation: JWT,
      claimID,
      claimType: 'ID',
      proxy,
      status
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
          resolve({
            attested: res.body.attested,
            claimID,
            claims: [],
            index: key
          });
        }
      });
  });
}
