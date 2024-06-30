import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discord`,
  });

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to fetch access token' });
  }

  const data = await response.json();

  return res.status(200).json(data);
}