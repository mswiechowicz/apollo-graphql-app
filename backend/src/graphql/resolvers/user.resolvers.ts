import { Models } from '../../types';

export default {
	Query: {
		users: (_: any, args: any, models: Models) => models.User.findAll(),
		user: (_: any, { id }: { id: number }, models: Models) => models.User.findByPk(id),
	},
	Mutation: {
		createUser: (_: any, { name, email }: { name: string; email: string }, models: Models) =>
			models.User.create({ name, email }),
	},
};

// export default {
// 	Query: {
// 		users: (_: any, args: any, { models }: { models: IModels }) => models.User.findAll(),
// 		user: (_: any, { id }: { id: number }, { models }: { models: IModels }) =>
// 			models.User.findByPk(id),
// 	},
// 	Mutation: {
// 		createUser: (
// 			_: any,
// 			{ name, email }: { name: string; email: string },
// 			{ models }: { models: IModels }
// 		) => {
// 			models.User.create({ name, email });
// 		},
// 	},
// };
