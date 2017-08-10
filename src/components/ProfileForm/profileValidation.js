import memoize from 'lru-memoize';
import { createValidator, required, maxLength, email } from '../../../utils/validation';


const profileValidation = createValidator({
  name: [required, maxLength(20)],
  email: [required, email],
  phone: maxLength(12),
  ID: maxLength(20),
  privateKey: maxLength(100),
  description: maxLength(300)
});
export default memoize(10)(profileValidation);
