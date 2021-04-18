import env from '@/lib/env';

import FileStorageStrategy from './FileStorageStrategy';
import FirebaseStorageStrategy from './FirebaseStorageStrategy';

const getStorageStrategy = () => {
  const strategy = env('storage-strategy');

  switch (strategy) {
    case 'file':
      return new FileStorageStrategy();
    case 'firebase':
      return new FirebaseStorageStrategy();
    default:
      return new FileStorageStrategy();
  }
};

export {
  FileStorageStrategy,
  FirebaseStorageStrategy,

  getStorageStrategy
};
