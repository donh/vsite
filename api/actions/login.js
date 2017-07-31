import fs from 'fs';
import {TokenSigner} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}

export function session(req) {
  return new Promise((resolve, reject) => {
    const {socketToken} = req.body;
    console.log('socketToken =', socketToken);
    console.log('config.socket =', config.socket);
    const socket = io(config.server, {path: config.socket});
    socket.on('connect', () => {
      console.log('connect');
      const loginRequestToken = {
        token: socketToken
      };
      socket.emit('connection', JSON.stringify(loginRequestToken), (data) => {
        console.log('ACK from server wtih data: ', data);
      });
    });
    socket.on(socketToken, (data) => {
      console.log('event data =', data);
      socket.disconnect(true);
      const {error, login, user} = data.result;
      if (!login) {
        reject('Login failed.');
      } else if (error && error.length) {
        reject(error);
      } else {
        resolve(user);
      }
    });
    socket.on('error', (err) => {
      console.log('error err =', err);
      reject(err);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
}

export function token(req) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(new Date().getTime() / 1000);
    const expired = now + (30 * 86400);
    const tokenPayload = {
      iss: config.iss,
      aud: config.aud,
      iat: now,
      exp: expired,
      sub: 'login request',
      context: {
        clientID: config.clientID,
        clientName: config.clientName,
        clientPublicKey: config.publicKey,
        scope: 'name,phone,publicKey,proxy,controller,recovery,city'
      }
    };
    const rawPrivateKey = config.privateKey;
    const token = new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
    const payload = {
      clientJWT: token
    };
    superagent
      .post(config.token)
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
