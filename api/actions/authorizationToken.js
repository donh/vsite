import fs from 'fs';
import path from 'path';
import { TokenSigner } from 'jsontokens';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../cfg.json'), 'utf-8'));

export default function authorizationToken(req) {
  return new Promise((resolve, reject) => {
    const requester = ('requester' in req.query) ? req.query.requester : '';
    const scope = ('scope' in req.query) ? req.query.scope : '';
    const callback = ('callback' in req.query) ? req.query.callback : '';
    const { clientID, publicKey } = config;
    const now = Math.floor(new Date().getTime() / 1000);
    const expired = now + (30 * 86400);
    const tokenPayload = {
      iss: config.iss,
      aud: config.aud,
      iat: now,
      exp: expired,
      sub: 'authorization request',
      context: {
        clientID,
        clientPublicKey: publicKey,
        requesterName: requester,
        scope
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
          const { result } = res.body;
          result.callback = decodeURIComponent(callback);
          // result.callback = config.host + decodeURIComponent(callback);
          resolve(result);
        }
      });
  });
}
