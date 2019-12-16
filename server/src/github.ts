import axios from 'axios';

export interface GithubUser {
  two_factor_authentication: string;
  name: string;
  email?: string;
  type: string;
  id: number;
  login: string;
  avatar_url: string;
}

export async function authorizeCode(code: string) {
  const { data } = await axios.post<{ access_token: string }>(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return data.access_token;
}

export async function getGithubUser(token: string) {
  const [{ data: userData }, { data: emailData }] = await Promise.all([
    axios.get<GithubUser>('https://api.github.com/user', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `token ${token}`,
      },
    }),
    axios.get<
      Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>
    >('https://api.github.com/user/emails', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `token ${token}`,
      },
    }),
  ]);
  const email = emailData.find(e => e.primary && e.verified);
  userData.email = email?.email;
  return userData;
}

export function getLoginUrl() {
  return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`;
}
