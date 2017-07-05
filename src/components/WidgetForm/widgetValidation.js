import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const registerValidation = createValidator({
  name: [required, maxLength(20)],
  email: [required, email],
  phone: maxLength(12),
  ID: maxLength(20),
  privateKey: maxLength(100),
  publicKey: maxLength(100),
  address: maxLength(100)
});
export default memoize(10)(registerValidation);
