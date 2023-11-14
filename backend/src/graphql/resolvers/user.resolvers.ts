import { ApolloServerContext, IAuthPayload, ILoginInput, IUser } from '../../types';
import { getUserData } from '../../utils/jwt';
import { AuthenticationError, doLogin, getUserBy } from '../../utils/auth';
import { GraphQLError } from 'graphql/error';

export default {
  Query: {
    users: (_: any, args: any, { models, user }: ApolloServerContext): IUser[] => {
      if (!user) {
        throw AuthenticationError('Access denied.');
      }

      return models.User.findAll();
    },
    userData: async (
      _: any,
      { at }: { at: string },
      { models }: ApolloServerContext
    ): Promise<IUser | null> => {
      const connectedUser = await getUserData(at);

      if (connectedUser) {
        return await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            privilege: connectedUser.privilege,
            active: connectedUser.active,
          },
          models
        );
      }

      throw new GraphQLError('Something is broken');
    },
  },
  Mutation: {
    createUser: (_: any, { input }: { input: IUser }, { models }: ApolloServerContext): IUser => {
      return models.User.create({ ...input });
    },
    login: (
      _: any,
      { input }: { input: ILoginInput },
      { models }: ApolloServerContext
    ): Promise<IAuthPayload> => {
      return doLogin(input.email, input.password, models);
    },
  },
};
