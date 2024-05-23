import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax');
    res.status(200).json({ message: 'Logged out' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
