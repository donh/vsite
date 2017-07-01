Object.defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Generate a random string
 */
function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let index = length; index > 0; --index) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

exports.default = randomString;
