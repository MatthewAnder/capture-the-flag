import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'super-secret-key-do-not-share';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Simple authentication (intentionally weak for CTF)
  if (username === 'guest' && password === 'guest123') {
    const token = jwt.sign(
      {
        username: 'guest',
        role: 'user',
        timestamp: Date.now()
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      token,
      message: 'Logged in as guest user'
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
