import { gql } from 'apollo-server';

export default gql`
  scalar Date

  type Todo {
    id: Int!
    name: String!
    complete: Boolean!
    date: Date
  }

  type Query {
    todos: [Todo!]!
    users: [User]!
  }

  type Mutation {
    createTodo(name: String!, date: Date!): Todo!
    updateTodo(id: Int!, name: String, complete: Boolean): Todo!
    destroyTodo(id: Int!): Todo!
  }

  type User {
    ID: Int
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
    ID: Int
    name: String
    description: String
    responsible: User
    created: ResponsibilityUpdate
    updated: ResponsibilityUpdate
  }

  type ResponsibilityUpdate {
    ID: Int
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
    at: String
    by: User
  }

  type UserCreatedEvent implements Event {
    at: String
    by: User
    created: User
  }

  type UserDeletedEvent implements Event {
    at: String
    by: User
    deleted: User
  }

  type SessionStartEvent implements Event {
    at: String
    by: User
    from_ip: String
    from_device: String
    user_agent: String
  }
`;
