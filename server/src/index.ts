import { ApolloServer } from 'apollo-server';
import program from 'commander';
import { sequelize } from './models';
import resolvers from './resolvers';
import typeDefs from './schema';

program.option('-s, --sync-db', 'Sync database').parse(process.argv);

const run = () => {
  if (program.syncDb) {
    sequelize
      .sync({ force: true })
      .then(() => console.log('Database updated!'))
      .catch((e: Error) => {
        console.error('could not update the database!', e);
        process.exit(1);
      });
  } else {
    // Type definitions define the "shape" of your data and specify
    // which ways the data can be fetched from the GraphQL server.

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({ typeDefs, resolvers });

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    server.listen(process.env.PORT || 4000).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
};

run();
