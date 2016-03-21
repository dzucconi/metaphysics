import _ from 'lodash';
import qs from 'qs';
import googleCSE from '../apis/google';
import httpLoader from './http';
const {
  GOOGLE_CSE_KEY,
  GOOGLE_CSE_CX,
} = process.env;

export const googleCSELoader = httpLoader(googleCSE);

export default (options = {}) => {
  const queryString = qs.stringify(_.assign(options, {
    key: GOOGLE_CSE_KEY,
    cx: GOOGLE_CSE_CX,
  }));

  return googleCSELoader.load(`?${queryString}`);
};
