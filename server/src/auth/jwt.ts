import { Token } from 'graphql';
import jwt from 'jsonwebtoken';
import { Permission } from '../generated/graphql';
import { User } from '../models/User';

export interface TokenData {
  name: string;
  permissions: Permission[];
  deactivated: boolean;
  expiresIn: Date;
  issuedAt: Date;
  id: number;
}

export function createJwtTokenFor(user: User) {
  return jwt.sign(
    {
      name: user.name,
      permissions: user.permissions,
      deactivated: user.deactivated,
    },
    jwtSecret(),
    {
      expiresIn: '1d',
      issuer: 'gh',
      audience: 'my_app',
      subject: `${user.id}`,
    }
  );
}

function jwtSecret(): jwt.Secret {
  return process.env.JWT_SECRET || 'my_little_secret';
}

export function verify(token: string): TokenData {
  const result = jwt.verify(token, jwtSecret()) as {
    sub: string;
    exp: number;
    iat: number;
    name: string;
    permissions: Permission[];
    deactivated: boolean;
  };
  return {
    id: Number(result.sub),
    name: result.name,
    permissions: result.permissions,
    deactivated: result.deactivated,
    expiresIn: new Date(result.exp * 1000),
    issuedAt: new Date(result.iat * 1000),
  };
}
