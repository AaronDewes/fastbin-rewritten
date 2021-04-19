import env from '@/lib/env';
import { getStorageStrategy } from '@/lib/storageStrategies';
import { NextApiRequest, NextApiResponse } from 'next';
const torDetect = require('tor-detect');

const randOf = (collection) => {
  return () => {
    return collection[Math.floor(Math.random() * collection.length)];
  };
};

// Helper methods to get an random vowel or consonant
const randVowel = randOf('aeiou');
const randConsonant = randOf('bcdfghjklmnpqrstvwxyz');

function createKey(keyLength) {
  let text = '';
  const start = Math.round(Math.random());

  for (let i = 0; i < keyLength; i++) {
    text += (i % 2 === start) ? randConsonant() : randVowel();
  }

  return text;
}


const storage = getStorageStrategy();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: env('limits.max-payload-size') || '10mb'
    }
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed.'
    });
  }

  const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const isTor = await torDetect(ipAddress);

  const contents = typeof req.body === 'string'
    ? req.body
    : req.body && req.body[''];

  if (!contents || !contents.length) {
    return res.status(422).json({
      ok: false,
      error: 'Contents is too short.'
    });
  }

  const maxLength = parseInt(env('limits.max-body-length'), 10);

  if (contents.length > maxLength) {
    return res.status(422).json({
      ok: false,
      error: `Your snippet needs to be less than ${maxLength} characters long.`
    });
  }

  const splitContent = contents.split("=== Umbrel-Paste split ===");

  try {
    let key: string | null = null;

    do {
      key = createKey(7);
    } while (await storage.exists(key));

    if(splitContent[1]) {
      await storage.create(key, {logs: splitContent[0], dmesg: splitContent[1]}, isTor);
    } else {
      await storage.create(key, {logs: splitContent[0], dmesg: "This paste has been generated using an old version of Umbrel, so this tab isn't available. Please visit the second link of the output instead." }, isTor);
    }

    return res.json({ ok: true, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
};
