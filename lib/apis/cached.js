import cache from '../cache';
import { throttled } from '../throttle';

export default fn => (path, options) => {
  console.log('--------');
  console.log('OPTIONS:', Object.keys(options.headers));
  console.log('LOADING:', path);

  return new Promise((resolve, reject) => {
    // Attempt to get cached response
    cache.get(path).then(data => {
      // Return cached data to user
      resolve(data);
      // Refresh stale data
      throttled(path, () =>
        fn(path).then(response =>
          cache.set(path, response)
        )
      );
    }, () => {
      // `path` is not in the cache fetch it from the
      // remote and set the cache
      fn(path).then(response => {
        resolve(response);
        cache.set(path, response);
      }).catch(reject);
    });
  });
};
