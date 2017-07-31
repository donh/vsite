import fs from 'fs';
import {TokenSigner} from 'jsontokens';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function claim(req) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(new Date().getTime() / 1000);
    const expired = now + (30 * 86400);
    const tokenPayload = {
      iss: config.iss,
      aud: config.aud,
      iat: now,
      exp: expired,
      sub: 'claim request',
      context: {
        clientID: config.clientID,
        clientName: config.clientName,
        clientPublicKey: config.publicKey
      }
    };
    const rawPrivateKey = config.privateKey;
    const token = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
    console.log('token =', token);
    const payload = {
      clientJWT: token
    };
    superagent
      .post(config.claim)
      .send(payload)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('superagent err =', err);
          reject(err);
        } else {
          const {result, time} = res.body;
          resolve(result);
        }
      });
  });
}
