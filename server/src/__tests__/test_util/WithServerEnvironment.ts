import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import * as jest from 'jest';
import { UUID } from 'sequelize/types';
import { Permission } from '../../generated/graphql';
import { User } from '../../models/User';
import resolvers from '../../resolvers';
import typeDefs from '../../schema';
import { sequelize } from '../../sequalize';

export class WithServerEnvironment {
  public server?: ApolloServer;
  public client?: ApolloServerTestClient;
  public withMockUsers: boolean = false;

  public start = async (callback: jest.DoneCallback) => {
    try {
      await sequelize.sync({ force: true });
      console.log('Database updated!');
      if (this.withMockUsers) {
        await this.insertMockUsers();
      }

      this.server = new ApolloServer({ typeDefs, resolvers });
      this.client = createTestClient(this.server);
      callback();
    } catch (e) {
      console.error('Could not init' + e);
      callback.fail(e);
      sequelize.close();
      throw e;
    }
  };

  private insertMockUsers = () => {
    return Promise.all([
      User.create({
        name: 'Bob Dylan',
        email: 'bob@dylan.com',
        permission: [Permission.ModifyPermissions],
        disabled: false,
      }),

      User.create({
        name: 'Harry Potter',
        email: 'harry@potter.com',
        permission: [Permission.ManageUsers],
        disabled: false,
      }),
    ]);
  };

  public stop = async () => {
    await this.server?.stop();
    console.log('server stopped');
  };
}
