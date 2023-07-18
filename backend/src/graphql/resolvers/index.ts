import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user.resolvers';
import productResolvers from './product.resolvers';

const resolversArray = [userResolvers, productResolvers];

const resolvers = mergeResolvers(resolversArray);
export { resolvers };
