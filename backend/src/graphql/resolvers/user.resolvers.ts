import { IAuthPayload, ILoginInput, IUser, Models } from '../../types';
import { getUserData } from '../../utils/jwt';
import { doLogin, getUserBy } from '../../utils/auth';
import { GraphQLError } from 'graphql/error';

export default {
	Query: {
		users: (_: any, args: any, models: Models): IUser[] => models.User.findAll(),
		userData: async (_: any, { at }: { at: string }, models: Models): Promise<IUser | null> => {
			const connectedUser = await getUserData(at);

			if (connectedUser) {
				const user = await getUserBy(
					{
						id: connectedUser.id,
						email: connectedUser.email,
						privilege: connectedUser.privilege,
						active: connectedUser.active,
					},
					models
				);

				if (user) {
					return { ...connectedUser };
				}
			}

			throw new GraphQLError('Something is broken');
		},
	},
	Mutation: {
		createUser: (_: any, { input }: { input: IUser }, models: Models): IUser => {
			return models.User.create({ ...input });
		},
		login: (_: any, { input }: { input: ILoginInput }, models: Models): Promise<IAuthPayload> => {
			return doLogin(input.email, input.password, models);
		},
	},
};
