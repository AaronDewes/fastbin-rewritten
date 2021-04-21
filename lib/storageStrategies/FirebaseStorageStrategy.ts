import Firebase, { UmbrelLog } from '@/lib/firebase';
import IStorageStrategy from './IStorageStrategy';

class FirebaseStorageStrategy implements IStorageStrategy {
  async create(key: string, data: UmbrelLog) {
    await new Firebase().upload(key, data);
  }

  async get(key: string) {
    return new Firebase().read(key);
  }

  async exists(key: string) {
    return new Firebase().exists(key);
  }

  async delete(key: string) {
    return new Firebase().delete(key);
  }
}

export default FirebaseStorageStrategy;
