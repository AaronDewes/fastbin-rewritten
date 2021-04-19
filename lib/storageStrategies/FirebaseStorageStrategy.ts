import Firebase, { UmbrelLog } from '@/lib/firebase';
import IStorageStrategy from './IStorageStrategy';

class FirebaseStorageStrategy implements IStorageStrategy {
  async create(key: string, data: UmbrelLog, isTor: boolean) {
    await new Firebase().upload(key, data, isTor);
  }

  async get(key: string) {
    return new Firebase().read(key);
  }

  async exists(key: string) {
    return new Firebase().exists(key);
  }
}

export default FirebaseStorageStrategy;
