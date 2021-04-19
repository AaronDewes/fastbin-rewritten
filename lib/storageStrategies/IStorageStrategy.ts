import { UmbrelLog } from "../firebase";

export default interface IStorageStrategy {
  create(key: string, data: UmbrelLog, isTor: boolean);
  get(key: string): Promise<UmbrelLog>;
  exists(key: string): Promise<boolean>;
}
