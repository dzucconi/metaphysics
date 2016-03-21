import createHTTPLoader from './http';
import gravity from '../apis/gravity';
// import positron from '../apis/positron';
// import google from '../apis/google';

export default options => {
  const gravityLoader = createHTTPLoader(gravity({ cache: true }));

  gravityLoader.cached = gravityLoader;
  gravityLoader.uncached = createHTTPLoader(gravity({ cache: false, auth: options.gravity }));

  return {
    gravity: gravityLoader,
    // positron: createHTTPLoader(positron(options.positron)),
    // google: createHTTPLoader(google(options.google)),
  };
};
