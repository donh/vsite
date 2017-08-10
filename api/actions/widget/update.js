import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '/../../../cfg.json'), 'utf-8'));

export default function update(req) {
  console.log('/widget/update   req.body =', req.body);
  return new Promise((resolve, reject) => {
    superagent
      .post(config.register)
      .send(req.body)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log('superagent err =', err);
        if (err) {
          reject(err);
        } else {
          const { user } = res.body.result;
          console.log('superagent user =', user);
          resolve(user);
        }
      });
  });
}
