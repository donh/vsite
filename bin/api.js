#!/usr/bin/env node
const piping = require('piping');

if (process.env.NODE_ENV !== 'production') {
  if (!piping({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
