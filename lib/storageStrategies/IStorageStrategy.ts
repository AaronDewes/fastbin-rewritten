import { UmbrelLog } from "../firebase";

export default interface IStorageStrategy {
  create(key: string, data: UmbrelLog);
  get(key: string): Promise<UmbrelLog>;
  exists(key: string): Promise<boolean>;
  delete(key: string);
}
