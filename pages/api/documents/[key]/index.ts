import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;

  const data = await fetch(`https://api.debug.umbrel.tech/api/read`, {
    method: 'POST',
    body: JSON.stringify({
      key
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await data.json();
  res.json({ ok: true, ...response });
};
