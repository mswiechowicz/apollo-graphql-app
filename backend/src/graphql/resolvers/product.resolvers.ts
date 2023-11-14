import { ApolloServerContext, IProduct, Models } from '../../types';

export default {
  Query: {
    products: (_: any, args: any, models: Models) => models.Product.findAll(),
    product: (_: any, { id }: { id: number }, { models }: ApolloServerContext) =>
      models.Product.findByPk(id),
  },
  Mutation: {
    createProduct: (
      _: any,
      { productInput }: { productInput: IProduct },
      { models }: ApolloServerContext
    ) => {
      return models.Product.create(productInput);
    },
  },
};
