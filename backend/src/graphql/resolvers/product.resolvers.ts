import { Models } from '../../types';

export default {
	Query: {
		products: (_: any, args: any, models: Models) => models.Product.findAll(),
		product: (_: any, { id }: { id: number }, models: Models) => models.Product.findByPk(id),
	},
	Mutation: {
		createProduct: (
			_: any,
			{
				name,
				shortDescription,
				description,
				categoryId,
				categoryDisplayName,
				img,
				deleted,
			}: {
				name: string;
				shortDescription: string;
				description: string;
				categoryId: string;
				categoryDisplayName: string;
				img: string;
				deleted: boolean;
			},
			models: Models
		) =>
			models.Product.create({
				name,
				shortDescription,
				description,
				categoryId,
				categoryDisplayName,
				img,
				deleted,
			}),
	},
};
