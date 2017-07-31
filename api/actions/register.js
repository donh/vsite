import fs from 'fs';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(__dirname + '/../../cfg.json', 'utf-8'));

export default function register(req) {
  return new Promise((resolve, reject) => {
    superagent
      .post(config.register)
      .send(req.body)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('superagent err =', err)
          reject(err);
        } else {
          const {result, time} = res.body;
          const {user} = result;
          resolve(user);
        }
      });
  });
}
