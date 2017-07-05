import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const profileValidation = createValidator({
  // name: [required, maxLength(10)],
  name: [required, maxLength(20)],
  email: [required, email],
  phone: maxLength(12),
  ID: maxLength(20),
  privateKey: maxLength(100),
  // publicKey: maxLength(100),
  // address: maxLength(100)
  description: maxLength(300)
  // fields: {name, email, phone, ID, privateKey, publicKey, address},
  // occupation: maxLength(20) // single rules don't have to be in an array
});
export default memoize(10)(profileValidation);
