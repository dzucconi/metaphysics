import timer from '../timer';
import { error } from '../loggers';

export const annotate = (fn, label) => {
  return new Promise((resolve, reject) => {
    const clock = timer(label);
    clock.start();
    fn().then(...args => {
      resolve(...args);
      clock.end();
    }).catch(...args => {
      error(label, ...args);
      reject(...args);
      clock.end();
    });
  });
};
