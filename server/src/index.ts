import { ApolloServer } from 'apollo-server-express';
import program from 'commander';
import express from 'express';
import prometheusMiddleware from 'express-prom-bundle';
import { getLogger } from './logging/logging';
import { sequelize } from './models';
import resolvers from './resolvers';
import typeDefs from './schema';

const log = getLogger(module);
program.option('-s, --sync-db', 'Sync database').parse(process.argv);

const run = () => {
  if (program.syncDb) {
    sequelize
      .sync({ force: true })
      .then(() => {
        log.info('Database updated!');
        sequelize.close();
      })
      .catch((e: Error) => {
        log.error('could not update the database!', e);
        sequelize.close();
        process.exit(1);
      });
  } else {
    // Type definitions define the "shape" of your data and specify
    // which ways the data can be fetched from the GraphQL server.

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();
    app.use(
      prometheusMiddleware({
        includeMethod: true,
        buckets: [0.1, 0.4, 0.7],
        promClient: {
          collectDefaultMetrics: {
            timeout: 2000,
            prefix: 'todo_app',
          },
        },
      })
    );
    server.applyMiddleware({
      app,
    });
    app.listen(process.env.PORT || 4000, () => {
      log.info(
        `🚀  Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`
      );
    });
  }
};

run();
