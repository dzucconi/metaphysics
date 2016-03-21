import qs from 'qs';
import { assign, get, isEmpty } from 'lodash';
import cached from './cached';
import config from '../../config';
import fetch from './fetch';

const { GRAVITY_API_BASE } = process.env;

// Returns a fn that accepts a path
const gravity = ({ cache, auth } = {}) => {
  const api = path => {
    const headers = {
      'X-XAPP-TOKEN': config.GRAVITY_XAPP_TOKEN,
    };

    const cacheable = cache && isEmpty(get(auth, 'accessToken'));

    if (!cacheable) {
      assign(headers, {
        'X-ACCESS-TOKEN': auth.accessToken,
      });
    }

    return (cacheable ? cached(fetch) : fetch)(`${GRAVITY_API_BASE}/${path}`, { headers });
  };

  api.load = (path, params = {}) =>
    path + '?' + qs.stringify(params, {
      arrayFormat: 'brackets',
    });

  return api;
};

export default gravity;
