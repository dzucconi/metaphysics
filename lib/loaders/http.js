import { wrap } from 'lodash';
import DataLoader from 'dataloader';

export default api => {
  const loader = new DataLoader(paths =>
    Promise.all(paths.map(api)), {
      batch: false,
      cache: true,
    });

  loader.load = wrap(loader.load, (load, path, params = {}, options = {}) => {
    return load.bind(loader)(api.load ? api.load(path, params, options) : path);
  });

  return loader;
};
