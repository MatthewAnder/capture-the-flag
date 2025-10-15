import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // VULNERABILITY: Decoding without verification!
    // This is the security flaw - we're using decode instead of verify
    const decoded = jwt.decode(token) as any;

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check if user is admin
    if (decoded.role === 'admin') {
      return res.status(200).json({
        success: true,
        flag: 'CTF{JWT_D3C0D3_N0T_V3R1FY_1S_B4D}',
        message: 'Congratulations! You found the flag!'
      });
    }

    return res.status(403).json({
      error: 'Access denied. Admin privileges required.',
      hint: 'Only admins can access this endpoint'
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token format' });
  }
}
