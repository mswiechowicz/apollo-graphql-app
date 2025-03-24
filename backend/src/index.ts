import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { models, sequelize } from './models';
import { typeDefs } from './graphql/types';
import { resolvers } from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerContext } from './types';
import { $server } from '../config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getFromAuthHeaderAsBearerToken, getUserData } from './utils/jwt';

const app = express();
const httpServer = http.createServer(app);

await sequelize
  .sync({ alter: true, force: false })
  .then(() => console.log('Database has been synchronized.'))
  .catch(error => console.error('Database sync error:', error));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const plugins = [
  ApolloServerPluginDrainHttpServer({ httpServer }),
  // ApolloServerPluginLandingPageDisabled() // uncomment for production
];
// set introspection to false for production usage
const server = new ApolloServer<ApolloServerContext>({ schema, plugins, introspection: true });
await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: ['http://localhost:3000', 'http://localhost'],
    credentials: true,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = getFromAuthHeaderAsBearerToken(req.headers.authorization);
      const user = token ? await getUserData(token) : null;

      return { models, user };
    },
  })
);

await new Promise<void>(resolve => httpServer.listen({ port: $server.port }, resolve));
console.log(`🚀 Server ready at http://localhost:${$server.port}/`);
