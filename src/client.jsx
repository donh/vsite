/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import io from 'socket.io-client';
import DevTools from './containers/DevTools/DevTools';
import ApiClient from './helpers/ApiClient';
import createStore from './redux/create';
import getRoutes from './routes';

const client = new ApiClient();
const browserHistory2 = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistory2, client, window.__data);
const history = syncHistoryWithStore(browserHistory2, store);

function initSocket() {
  const socket = io('', { path: '/ws' });
  socket.on('news', () => {
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log('msg', data);
  });

  return socket;
}

global.socket = initSocket();

const component = (
  <Router
    render={(props) => (
      <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
    )}
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes
    || !dest.firstChild.attributes['data-react-checksum']) {
    let str = 'Server-side React render was discarded. ';
    str = `${str} Make sure that your initial render does not contain any client-side code.`;
    console.error(str);
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
