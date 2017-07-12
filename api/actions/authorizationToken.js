import fs from 'fs';
import {decodeToken, TokenSigner} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function authorizationToken(req) {
  return new Promise((resolve, reject) => {
    const requester = ('requester' in req.query) ? req.query.requester : '';
    const scope = ('scope' in req.query) ? req.query.scope : '';
    const {clientID, clientName, publicKey} = config;
    const now = Math.floor(new Date().getTime() / 1000);
    const expired = now + (30 * 86400);
    const tokenPayload = {
      iss: config.iss,
      aud: config.aud,
      iat: now,
      exp: expired,
      sub: 'authorization request',
      context: {
        clientID: clientID,
        clientPublicKey: publicKey,
        requesterName: requester,
        scope: scope
      }
    };
    console.log('tokenPayload =', tokenPayload);
    const rawPrivateKey = config.privateKey;
    const token = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
    const payload = {
      clientJWT: token
    };
    superagent
      .post(config.authorizationToken)
      .send(payload)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('superagent err =', err);
          reject(err);
        } else {
          const {result, time} = res.body;
          console.log('superagent result =', result);
          resolve(result);
        }
      });
  });
}
