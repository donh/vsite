import fs from 'fs';
import path from 'path';
import { decodeToken } from 'jsontokens';
import io from 'socket.io-client';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../cfg.json'), 'utf-8'));

export default function authorization(req) {
  return new Promise((resolve, reject) => {
    const { callback, socketToken } = req.body;
    const socket = io(config.server, { path: config.socket });
    socket.on('connect', () => {
      console.log('connect');
      const authorizationRequestToken = {
        token: socketToken
      };
      socket.emit('connection', JSON.stringify(authorizationRequestToken), (data) => {
        console.log('ACK from server wtih data: ', data);
      });
    });
    socket.on(socketToken, (data) => {
      console.log('SOCKET RETURN socketToken =', socketToken);
      console.log('event data =', data);
      socket.disconnect(true);
      const { error, result } = data;
      console.log('event result =', result);
      if (!('ID' in result)) {
        reject('Authorization failed.');
      } else if (Object.keys(result.ID).length === 0) {
        reject('Authorization failed.');
      } else if (error && error.length) {
        reject(error);
      } else {
        const { context } = decodeToken(result.ID.attestation).payload;
        const { authority, expiryDate, gender, ID, issueDate, name } = context;
        const URL = `${callback}?name=${name}&ID=${ID}&gender=${gender}&issueDate=${issueDate}`;
        resolve(`${URL}&expiryDate=${expiryDate}&authority=${authority}`);
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
