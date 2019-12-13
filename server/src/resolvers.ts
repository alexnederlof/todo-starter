import { isUserWhitespacable } from '@babel/types';
import { Kind } from 'graphql/language/kinds';
import { GraphQLScalarType } from 'graphql/type/definition';
import { async } from 'q';
import { Op } from 'sequelize';
import { Todo } from './models/Todo';
import { User } from './models/User';
import {
  MutationCreateTodoArgs,
  MutationUpdateTodoArgs,
  MutationDestroyTodoArgs,
  MutationCreateUserArgs,
  QueryUserArgs,
  QueryUsersArgs,
  MutationUpdateUserArgs,
} from './generated/graphql';

export default {
  Query: {
    todos: async () => {
      const result = await Todo.findAll({});
      return result;
    },
    users: async (_: any, { query }: QueryUsersArgs) => {
      if (!query?.length) {
        return await User.findAll({});
      } else {
        const matchers = query
          .split(' ')
          .filter(q => q.length > 0)
          .map(q => `%${q.toLocaleLowerCase()}%`)
          .map(q => ({
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: q,
                },
              },
              {
                email: {
                  [Op.iLike]: q,
                },
              },
            ],
          }));

        return await User.findAll({
          where: {
            [Op.or]: matchers,
          },
        });
      }
    },

    user: async (_: any, { id }: QueryUserArgs) => {
      const result = await User.findByPk(Number(id));
      return result;
    },
  },
  Mutation: {
    createTodo: async (_: any, args: MutationCreateTodoArgs) => {
      const created = await Todo.create({ complete: false, ...args });
      return created;
    },
    updateTodo: async (_: any, { id, ...args }: MutationUpdateTodoArgs) => {
      const todo = await Todo.findOne({ where: { id } });
      if (todo) {
        return todo.update(args);
      } else {
        return null;
      }
    },
    destroyTodo: async (_: any, { id }: MutationDestroyTodoArgs) => {
      const todo = await Todo.findOne({ where: { id } });
      if (todo) {
        return todo.destroy();
      } else {
        return null;
      }
    },

    createUser: async (_: any, { name, email, permissions }: MutationCreateUserArgs) => {
      console.log('Creating user');
      const created = await User.create({
        name,
        email,
        permissions,
        disabled: false,
      });
      return created;
    },

    updateUser: async (_: any, toUpdate: MutationUpdateUserArgs) => {
      console.log('Updating user ' + toUpdate.id);
      let user = await User.findByPk(Number(toUpdate.id));
      user = user.update(toUpdate);
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
