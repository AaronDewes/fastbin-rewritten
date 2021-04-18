import env from '@/lib/env';

import FirebaseStorageStrategy from './FirebaseStorageStrategy';

const getStorageStrategy = () => {
  return new FirebaseStorageStrategy();
};

export {
  FirebaseStorageStrategy,
  getStorageStrategy
};
