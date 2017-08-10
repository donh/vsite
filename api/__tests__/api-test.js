import { expect } from 'chai';
import { mapUrl } from '../utils/url';

function splittedUrlPath(URL) {
  return URL.split('?')[0].split('/').slice(1);
}

const availableActions = (key) => {
  const item = { a: 1 };
  item[key] = { c: 1, load: () => 'baz' };
  return item;
};

function validator(paths, item, action, params) {
  expect(mapUrl(item, paths)).to.deep.equal({
    action,
    params
  });
}

describe('mapUrl', () => {
  it('extracts nothing if both params are undefined', () => {
    validator(undefined, undefined, null, []);
  });

  it('extracts nothing if the url is empty', () => {
    validator(splittedUrlPath(''), availableActions('widget'), null, []);
  });

  it('extracts nothing if nothing was found', () => {
    const url = '/widget/load/?foo=bar';
    validator(splittedUrlPath(url), availableActions('info'), null, []);
  });

  it('extracts the available actions and the params from an relative url string with GET params',
    () => {
      const url = '/widget/load/param1/xzy?foo=bar';
      const item = availableActions('widget');
      validator(splittedUrlPath(url), item, item.widget.load, ['param1', 'xzy']);
    });

  it('extracts the available actions from an url string without GET params', () => {
    const url = '/widget/load/?foo=bar';
    const item = availableActions('widget');
    validator(splittedUrlPath(url), item, item.widget.load, ['']);
  });

  it('does not find the avaialble action if deeper nesting is required', () => {
    const url = '/widget';
    const item = availableActions('widget');
    validator(splittedUrlPath(url), item, null, []);
  });
});
