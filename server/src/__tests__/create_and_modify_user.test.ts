import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerTestClient } from 'apollo-server-testing';
import { MutationCreateUserArgs, Permission } from '../generated/graphql';
import { Event } from '../models/Events';
import { User } from '../models/User';
import { WithServerEnvironment } from './test_util/WithServerEnvironment';

const testServer = new WithServerEnvironment();

beforeAll(async (callback: jest.DoneCallback) => await testServer.start(callback));
afterAll(async () => await testServer.stop());

const createUserQuery = gql`
  mutation CreateUser($name: String!, $email: String!, $permissions: [Permission!]!) {
    createUser(name: $name, email: $email, permissions: $permissions) {
      id
      email
      name
      permissions
      deactivated
    }
  }
`;

const updateUserQuery = gql`
  mutation UpdateUser($id: ID!, $deactivated: Boolean, $name: String, $permissions: [Permission!]) {
    updateUser(id: $id, name: $name, deactivated: $deactivated, permissions: $permissions) {
      id
      email
      name
      permissions
      deactivated
    }
  }
`;

test('Create and update user works', async () => {
  expect(await User.findAll()).toEqual([]);
  expect(await Event.findAll()).toEqual([]);
  const toCreate: MutationCreateUserArgs = {
    name: 'Some User',
    email: 'me@example.com',
    permissions: [Permission.ModifyPermissions],
  };
  const result = await testServer.client?.mutate({
    mutation: createUserQuery,
    variables: toCreate,
  });

  expect(result!.errors).toBeUndefined();
  const user: User = result?.data?.createUser!;
  expect(user.name).toEqual(toCreate.name);
  expect(user.email).toEqual(toCreate.email);
  expect(user.permissions).toEqual(toCreate.permissions);

  const updateResult = await testServer.client?.mutate({
    mutation: updateUserQuery,
    variables: { id: user.id, permissions: [Permission.ManageUsers] },
  });

  expect(result!.errors).toBeUndefined();
  const updated: User = updateResult?.data?.updateUser!;
  expect(updated.id).toEqual(user.id);
  expect(updated.permissions).toEqual([Permission.ManageUsers]);

  expect(await Event.findAll()).toHaveLength(1);
});
