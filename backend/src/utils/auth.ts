import { IAuthPayload, IUser, Models } from '../types';
import { GraphQLError } from 'graphql/error';
import bcrypt from 'bcryptjs';
import { createToken } from './jwt';

export const getUserBy = async (where: object, models: Models): Promise<IUser | null> => {
  return await models.User.findOne({ where, raw: true });
};

const AuthenticationError = (msg: string) => {
  return new GraphQLError(msg, { extensions: { code: 'UNAUTHENTICATED' } });
};

export const doLogin = async (
  email: string,
  password: string,
  models: Models
): Promise<IAuthPayload> => {
  const user = await getUserBy({ email }, models);

  if (!user) {
    throw AuthenticationError('Incorrect login.');
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw AuthenticationError('Incorrect login.');
  }

  const isActive = user.active;
  if (!isActive) {
    throw AuthenticationError('The account has not yet been activated.');
  }

  const [token] = await createToken(user);
  return { token };
};
