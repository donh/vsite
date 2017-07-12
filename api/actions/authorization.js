import fs from 'fs';
import {decodeToken, TokenSigner} from 'jsontokens';
import io from 'socket.io-client';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function authorization(req) {
  console.log('authorization()');
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
      console.log('SOCKET RETURN socketToken =', socketToken);
      console.log('event data =', data);
      socket.disconnect(true);
      const {error, login, user} = data.result;
      if (!login) {
        reject('Login failed.');
      } else if (error.length) {
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


// export function session(req) {
//   return new Promise((resolve, reject) => {
//     const {socketToken} = req.body;
//     console.log('socketToken =', socketToken);
//     console.log('config.socket =', config.socket);
//     const socket = io(config.server, {path: config.socket});
//     socket.on('connect', () => {
//       console.log('connect');
//       const loginRequestToken = {
//         token: socketToken
//       };
//       socket.emit('connection', JSON.stringify(loginRequestToken), (data) => {
//         console.log('ACK from server wtih data: ', data);
//       });
//     });
//     socket.on(socketToken, (data) => {
//       console.log('event data =', data);
//       socket.disconnect(true);
//       const {error, login, user} = data.result;
//       if (!login) {
//         reject('Login failed.');
//       } else if (error.length) {
//         reject(error);
//       } else {
//         resolve(user);
//       }
//     });
//     socket.on('error', (err) => {
//       console.log('error err =', err);
//       reject(err);
//     });
//     socket.on('disconnect', () => {
//       console.log('disconnect');
//     });
//   });
// }