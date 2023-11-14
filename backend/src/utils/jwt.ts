import jwt from 'jsonwebtoken';
import { $security } from '../../config';
import { IUser } from '../types';

const { secretKey } = $security;

const getBase64 = (value: string) => {
  return JSON.parse(Buffer.from(value, 'base64').toString('ascii'));
};

const setBase64 = (value: any) => {
  if (typeof value === 'string') {
    return Buffer.from(value).toString('base64');
  }
  return Buffer.from(JSON.stringify(value)).toString('base64');
};

export function jwtVerify(accessToken: string, callbackFn: Function): void {
  jwt.verify(accessToken, secretKey, (error: any, accessTokenData: any = {}) => {
    const { data: user } = accessTokenData;

    if (error || !user) {
      return callbackFn(false);
    }

    const userData = getBase64(user);

    return callbackFn(userData);
  });
}

export async function getUserData(accessToken: string): Promise<any> {
  return await new Promise(resolve => {
    return jwtVerify(accessToken, (user: any) => resolve(user));
  });
}

export function getFromAuthHeaderAsBearerToken(authHeader: string | undefined) {
  if (!authHeader) {
    return null;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return null;
  }

  return token;
}

export function createToken(user: IUser): string {
  const { id, username, email, privilege, active } = user;

  const userData = { id, username, email, privilege, active };

  return jwt.sign({ data: setBase64(userData) }, $security.secretKey, {
    expiresIn: $security.expiresIn,
  });
}
