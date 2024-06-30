import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req = NextApiRequest, res = NextApiResponse) {
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/discord`;
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;

  res.redirect(discordAuthUrl);
}