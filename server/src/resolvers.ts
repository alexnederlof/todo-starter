import { AppContext } from '.';
import { isUserWhitespacable } from '@babel/types';
import { Kind } from 'graphql/language/kinds';
import Maybe from 'graphql/tsutils/Maybe';
import { GraphQLScalarType } from 'graphql/type/definition';
import jwt from 'jsonwebtoken';
import { async } from 'q';
import { Op } from 'sequelize';
import { createJwtTokenFor } from './auth/jwt';
import { authorizeCode, getGithubUser } from './github';
import { Event } from './models/Events';
import { User } from './models/User';

import {
  MutationCreateUserArgs,
  QueryUserArgs,
  QueryUsersArgs,
  MutationUpdateUserArgs,
  MutationAuthorizeWithGithubArgs,
  AuthResponse,
} from './generated/graphql';

export default {
  Query: {
    users: async (_: any, { query }: QueryUsersArgs): Promise<User[]> => {
      return User.search(query);
    },

    user: async (_: any, { id }: QueryUserArgs): Promise<User | null> => {
      const result = await User.findByPk(Number(id));
      return result;
    },

    me: async (_: any, {}, context: AppContext): Promise<User> => {
      return User.findByPk(context.token?.id);
    },
  },
  Mutation: {
    authorizeWithGithub: async (
      _: any,
      { code }: MutationAuthorizeWithGithubArgs
    ): Promise<AuthResponse> => {
      console.log('Login to GitHub with ' + code);
      const authToken = await authorizeCode(code);
      console.log('Got auth token ' + authToken);
      const githubUser = await getGithubUser(authToken);
      console.log('Now authorized as ', githubUser);

      let user = await User.findOne({ where: { email: githubUser.email! } });
      if (!user) {
        console.log('Creating user ' + githubUser.email);
        user = await User.upsert({
          name: githubUser.name,
          email: githubUser.email,
          avatar: githubUser.avatar_url,
          permissions: [],
          disabled: false,
        });
      }
      const token = createJwtTokenFor(user);
      return { token, user };
    },

    createUser: async (
      _: any,
      { name, email, permissions }: MutationCreateUserArgs
    ): Promise<User> => {
      console.log('Creating user');
      const created = await User.create({
        name,
        email,
        permissions,
        disabled: false,
      });
      await Event.create({
        by: 1, // Should be the current user
        meta: {
          user: created.id,
        },
      });
      return created;
    },

    updateUser: async (_: any, toUpdate: MutationUpdateUserArgs): Promise<User> => {
      console.log('Updating user ' + toUpdate.id);
      let user: User = await User.findByPk(Number(toUpdate.id));
      user = await user.update(toUpdate);
      return user;
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
