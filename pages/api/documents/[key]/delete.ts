import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    ok: false,
    error: 'Deleting now happens automatically.'
  });
};
