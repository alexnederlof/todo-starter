import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Todo {
    id: ID!
    name: String!
    complete: Boolean!
    date: Date
  }

  type Query {
    todos: [Todo!]!
    users: [User!]!
  }

  type Mutation {
    createTodo(name: String!, date: Date!): Todo!
    updateTodo(id: ID!, name: String, complete: Boolean): Todo!
    destroyTodo(id: ID!): Todo!

    createUser(name: String!, email: String!, permissions: [Permission!]!): User!
    grantPermission(permission: Permission!): User!
    revokePermissions(permission: Permission!): User!
    setUserActive(id: ID!, active: Boolean): User!
  }

  type User {
    id: ID!
    email: String
    name: String
    avatar: String
    permissions: [Permission!]
    deactivated: Boolean
  }

  enum Permission {
    MANAGE_USERS
    MODIFY_PERMISSIONS
  }

  enum Action {
    USER_CREATED
    USER_DEACTIVATED
    SESSION_STARTED
  }

  interface Event {
    id: ID!
    at: String
    by: User
  }

  type UserCreatedEvent implements Event {
    id: ID!
    at: String
    by: User
    created: User
  }

  type UserDeletedEvent implements Event {
    id: ID!
    at: String
    by: User
    deleted: User
  }

  type SessionStartEvent implements Event {
    id: ID!
    at: String
    by: User
    from_ip: String
    from_device: String
    user_agent: String
  }
`;
