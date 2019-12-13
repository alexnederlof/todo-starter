import { gql } from 'apollo-server';
import { User } from '../models/User';
import { WithServerEnvironment } from './test_util/WithServerEnvironment';

const testServer = new WithServerEnvironment();
testServer.withMockUsers = true;

beforeAll(async (callback: jest.DoneCallback) => await testServer.start(callback));
afterAll(async () => await testServer.stop());

const userQuery = gql`
  query Users($query: String) {
    users(query: $query) {
      id
      name
      email
      deactivated
    }
  }
`;

test('Non existing name returns nothing', async () => {
  const users = await searchUsers('test');
  expect(users).toEqual([]);
});

test('No query finds everything', async () => {
  const users = await searchUsers();
  expect(users).toHaveLength(2);
});

test('Specific query finds specific user', async () => {
  const users = await searchUsers('Bob');
  expect(users).toHaveLength(1);
  expect(users[0].name).toEqual('Bob Dylan');
});

async function searchUsers(query?: string) {
  const result = await testServer.client!.query({
    query: userQuery,
    variables: { query },
  });
  if (result.errors) {
    throw new Error('Query failed: ' + result.errors);
  }

  const users = (result.data?.users as Array<User>) || [];
  return users;
}
