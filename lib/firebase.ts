import firebase from 'firebase-admin';
import env from './env';

import * as fs from 'fs';
import * as path from 'path';
import { Firestore } from '@google-cloud/firestore';

export type UmbrelLog = {
  logs: string;
  dmesg: string;
};

const getCredentials = () => {
  const serviceAccountFilepath = path.join(process.cwd(), '.firebase/credentials.json');

  if (fs.existsSync(serviceAccountFilepath)) {
    const serviceAccountFile = fs.readFileSync(serviceAccountFilepath, {
      encoding: 'utf8'
    });

    return JSON.parse(serviceAccountFile);
  }

  const serviceAccountEnv = env('firebase.service-account');

  if (serviceAccountEnv) {
    return JSON.parse(serviceAccountEnv);
  }

  return null;
};

const initFirebaseStorage = () => {
  if (firebase.apps.length === 0) {
    const credentials = getCredentials();

    firebase.initializeApp({
      credential: firebase.credential.cert(credentials)
    });
  }

  return firebase.app().firestore();
};

class Firebase {
  private storage: Firestore | null;

  constructor() {
    this.storage = initFirebaseStorage();
  }

  async exists(key): Promise<boolean> {
    return (await this.storage.doc(`uploads/${key}`).get()).exists;
  }

  async upload(key: string, data: UmbrelLog, isTor: boolean): Promise<any> {
    const logDocument = this.storage.doc(`uploads/${key}`);
    try {
      logDocument.set({logs: data.logs, dmesg: data.dmesg, tor: isTor});
      return true;
    } catch {
      return false;
    }
  }

  async delete(key: string): Promise<any> {
    const logDocument = this.storage.doc(`uploads/${key}`);
    try {
      logDocument.delete();
      return true;
    } catch {
      return false;
    }
  }

  async read(key: string): Promise<UmbrelLog> {
    const logDocument = this.storage.doc(`uploads/${key}`);
    const data = (await logDocument.get()).data();
    return {logs: data.logs, dmesg: data.dmesg};
  }
}

export default Firebase;
