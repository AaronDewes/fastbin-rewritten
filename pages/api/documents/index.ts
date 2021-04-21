import env from '@/lib/env';
import { getStorageStrategy } from '@/lib/storageStrategies';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

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

  let contents: Record<string, string>;
  
  if(typeof req.body === 'string') {
    contents = {
      logs: req.body.split("=== Umbrel-Paste split ===")[0],
      dmesg: req.body.split("=== Umbrel-Paste split ===")[1] || "This paste has been generated using an old version of Umbrel, so this tab isn't available. Please visit the second link of the output instead."
    };
  } else if(req.body.logs && req.body.dmesg) {
    contents = req.body;
  } else {
    contents = {
      logs: JSON.stringify(req.body),
      dmesg: ""
    };
  }

  if (!contents || !contents.logs.length) {
    return res.status(422).json({
      ok: false,
      error: 'Contents is too short.'
    });
  }

  const maxLength = parseInt(env('limits.max-body-length'), 10);

  if ((contents.dmesg.length + contents.logs.length) > maxLength) {
    return res.status(422).json({
      ok: false,
      error: `Your snippet needs to be less than ${maxLength} characters long.`
    });
  }

  try {
    let key: string | null = null;

    do {
      key = v4();
    } while (await storage.exists(key));

    await storage.create(key, {logs: contents.logs, dmesg: contents.dmesg});

    return res.json({ ok: true, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
};
