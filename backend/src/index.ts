import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { models, sequelize } from './models';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Models } from './types';

await sequelize
	.sync({ alter: true, force: false })
	.then(() => console.log('Baza danych została zsynchronizowana.'))
	.catch(error => console.error('Błąd synchronizacji bazy danych:', error));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer<Models>({ schema });
const { url } = await startStandaloneServer(server, {
	listen: { port: 3000 },
	context: async ({ req, res }) => models,
});

console.log(`🚀  Server ready at: ${url}`);
