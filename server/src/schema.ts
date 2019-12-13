import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Query {
    users(query: String): [User!]!
    user(id: ID!): User
    me: User!
  }

  type Mutation {
    createUser(name: String!, email: String!, permissions: [Permission!]!): User!
    updateUser(id: ID!, deactivated: Boolean, name: String, permissions: [Permission!]): User!
    authorizeWithGithub(code: String!): AuthResponse!
  }

  type AuthResponse {
    user: User!
    token: String!
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
    at: Date
    by: User
  }

  type UserCreatedEvent implements Event {
    id: ID!
    at: Date
    by: User
    created: User
  }

  type UserDeletedEvent implements Event {
    id: ID!
    at: Date
    by: User
    deleted: User
  }

  type SessionStartEvent implements Event {
    id: ID!
    at: Date
    by: User
    from_ip: String
    from_device: String
    user_agent: String
  }
`;
