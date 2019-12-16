import { ApolloServer, AuthenticationError } from 'apollo-server';
import program from 'commander';
import { config } from 'dotenv';
import { delay } from 'q';
import { TokenData, verify } from './auth/jwt';
import { getLoginUrl } from './github';
import resolvers from './resolvers';
import typeDefs from './schema';
import { sequelize } from './sequalize';

if (process.env.NODE_ENV !== 'production') {
  config();
}

program
  .option('-s, --sync-db', 'Sync database')
  .option('-f, --force', 'Force DB reste')
  .parse(process.argv);

export interface AppContext {
  token?: TokenData;
}

const run = async () => {
  if (program.syncDb) {
    sequelize
      .sync({ force: program.force })
      .then(() => {
        console.log('Database updated!');
        sequelize.close();
      })
      .catch((e: Error) => {
        console.error('could not update the database!', e);
        sequelize.close();
        process.exit(1);
      });
  } else {
    // Type definitions define the "shape" of your data and specify
    // which ways the data can be fetched from the GraphQL server.

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }): AppContext => {
        if (['AuthorizeWithGithub'].includes(req.body?.operationName)) {
          return {};
        }

        let token = req.headers.authorization || '';
        if (Array.isArray(token)) {
          token = token[0];
        }
        try {
          token = token.substring('Bearer '.length);
          const result = verify(token);
          return { token: result };
        } catch (e) {
          console.error('Got an invalid token', e);
          const err = new AuthenticationError('Invalid token ' + e);
          err.extensions['login_url'] = getLoginUrl();
          throw err;
        }
      },
    });

    while (true) {
      try {
        console.log('Checkin database connection');
        await sequelize.validate();
        break;
      } catch (e) {
        console.error('Cannot connect to database. Retry in 1 sec', e);
        await delay(1000);
      }
    }

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    server.listen(process.env.PORT || 4000).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
};

run();
