import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { models, sequelize } from './models';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Models } from './types';
import { $server } from '../config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.createServer(app);

await sequelize
	.sync({ alter: true, force: false })
	.then(() => console.log('Baza danych została zsynchronizowana.'))
	.catch(error => console.error('Błąd synchronizacji bazy danych:', error));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
const server = new ApolloServer<Models>({ schema, plugins });
await server.start();

app.use(
	'/',
	cors<cors.CorsRequest>({ origin: ['https://modernmario.pl'] }),
	bodyParser.json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => models,
	})
);

await new Promise<void>(resolve => httpServer.listen({ port: $server.port }, resolve));
console.log(`🚀 Server ready at http://localhost:${$server.port}/`);
