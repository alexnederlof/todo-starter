import { Kind } from 'graphql/language/kinds';
import { GraphQLScalarType } from 'graphql/type/definition';
import { Todo } from './models/Todo';
import { User } from './models/User';
import {
  MutationCreateTodoArgs,
  MutationUpdateTodoArgs,
  MutationDestroyTodoArgs,
} from './generated/graphql';

export default {
  Query: {
    todos: async () => {
      const result = await Todo.findAll({});
      return result;
    },
    users: async () => {
      const result = await User.findAll({});
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
