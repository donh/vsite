import fs from 'fs';
import superagent from 'superagent';
import load from './load';

const config = fs.readFileSync(__dirname + '/../../../cfg.json', 'utf-8');
const {register} = JSON.parse(config);

export default function update(req) {
  console.log('/widget/update   req.body =', req.body);
  return new Promise((resolve, reject) => {
    superagent
      .post(register)
      .send(req.body)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log('superagent err =', err)
        if (err) {
          reject(err);
        } else {
          const {result, time} = res.body;
          const {user} = res.body.result;
          console.log('superagent result =', result)
          console.log('superagent user =', user)
          console.log('superagent time =', time)
          resolve(user);
        }
      });
  });
}
