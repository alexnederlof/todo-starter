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

    createUser(name: String!, email: String!): User!
    addRole(role: Role!): User!
    removeRole(role: Role!): User!
    setUserActive(id: ID!, active: Boolean): User!
  }

  type User {
    id: ID!
    email: String
    name: String
    avatar: String
    responsibilities: [Responsibility]
    roles: [Role]
    deactivated: Boolean
  }

  enum Role {
    PROPOSE_RESPONSIBILITY
    APPROVE_RESPONSIBILITY
    REMOVE_RESPONSIBILITY
    MANAGE_USERS
  }

  type Responsibility {
    id: ID!
    name: String
    description: String
    responsible: User
    created: ResponsibilityUpdate
    updated: ResponsibilityUpdate
  }

  type ResponsibilityUpdate {
    id: ID!
    old: Responsibility
    new: Responsibility
    date: String
    proposed_by: User
    accepted_by: User
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
