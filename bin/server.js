#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
const path = require('path');
const piping = require('piping');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicTools = require('../webpack/webpack-isomorphic-tools');

const rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!piping({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicTools)
  .development(__DEVELOPMENT__)
  .server(rootDir, () => require('../src/server'));
