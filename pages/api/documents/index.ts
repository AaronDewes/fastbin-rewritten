import env from '@/lib/env';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: env('limits.max-payload-size') || '2mb'
    }
  }
};

interface ParsedLogs {
  main: string;
  dmesg: string;
  apps: string;
}

function parseContent(content: string): ParsedLogs {
  const parsed: ParsedLogs = {main: '', dmesg: '', apps: ''};
  const contentSplitAtDmesg = content.split('=== Umbrel-Paste split ===');
  const contentSplitAtAppLogs = contentSplitAtDmesg[0].split('App logs\n--------');
  if (!contentSplitAtDmesg[1]) {
    return {
      main: contentSplitAtAppLogs[0],
      dmesg: '',
      apps: "This upload has been done on the legacy server, so app logs aren't available."
    };
  }

  parsed.dmesg = contentSplitAtDmesg[1].trim();
  parsed.main = contentSplitAtAppLogs[0].trim();
  parsed.apps = contentSplitAtAppLogs[1] ? contentSplitAtAppLogs[1].trim() : "This upload has been done on the legacy server, so app logs aren't available.";
  return parsed;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed.'
    });
  }

  let contents: ParsedLogs;
  
  if(typeof req.body === 'string') {
    contents = parseContent(req.body);
  } else if(req.body.logs && req.body.dmesg) {
    contents = {
      main: req.body.logs,
      dmesg: req.body.dmesg,
      apps: "This upload has been done on the legacy server, so app logs aren't available."
    };
  } else {
    contents = {
      main: JSON.stringify(req.body),
      dmesg: "Error parsing logs!",
      apps: "This upload has been done on the legacy server, so app logs aren't available."
    };
  }

  if (!contents || !contents.main.length) {
    return res.status(422).json({
      ok: false,
      error: 'Contents is too short.'
    });
  }

  const data = await fetch(`https://api.debug.umbrel.tech/api/upload`, {
    method: 'POST',
    body: JSON.stringify(contents),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await data.json();


  return res.json({ ok: true, key: response.logKey });
};
