import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateTodoDocument = gql`
  mutation CreateTodo($name: String!) {
    createTodo(name: $name) {
      id
      name
      complete
    }
  }
`;
export type CreateTodoMutationFn = ApolloReactCommon.MutationFunction<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;
export type CreateTodoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateTodoMutation, CreateTodoMutationVariables>,
  'mutation'
>;

export const CreateTodoComponent = (props: CreateTodoComponentProps) => (
  <ApolloReactComponents.Mutation<CreateTodoMutation, CreateTodoMutationVariables>
    mutation={CreateTodoDocument}
    {...props}
  />
);

export type CreateTodoProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateTodoMutation,
  CreateTodoMutationVariables
> &
  TChildProps;
export function withCreateTodo<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateTodoMutation,
    CreateTodoMutationVariables,
    CreateTodoProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateTodoMutation,
    CreateTodoMutationVariables,
    CreateTodoProps<TChildProps>
  >(CreateTodoDocument, {
    alias: 'createTodo',
    ...operationOptions,
  });
}
export type CreateTodoMutationResult = ApolloReactCommon.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($id: Int!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete) {
      id
      name
      complete
    }
  }
`;
export type UpdateTodoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;
export type UpdateTodoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateTodoMutation, UpdateTodoMutationVariables>,
  'mutation'
>;

export const UpdateTodoComponent = (props: UpdateTodoComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateTodoMutation, UpdateTodoMutationVariables>
    mutation={UpdateTodoDocument}
    {...props}
  />
);

export type UpdateTodoProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
> &
  TChildProps;
export function withUpdateTodo<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
    UpdateTodoProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
    UpdateTodoProps<TChildProps>
  >(UpdateTodoDocument, {
    alias: 'updateTodo',
    ...operationOptions,
  });
}
export type UpdateTodoMutationResult = ApolloReactCommon.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;
export const DestroyTodoDocument = gql`
  mutation DestroyTodo($id: Int!) {
    destroyTodo(id: $id) {
      id
    }
  }
`;
export type DestroyTodoMutationFn = ApolloReactCommon.MutationFunction<
  DestroyTodoMutation,
  DestroyTodoMutationVariables
>;
export type DestroyTodoComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DestroyTodoMutation, DestroyTodoMutationVariables>,
  'mutation'
>;

export const DestroyTodoComponent = (props: DestroyTodoComponentProps) => (
  <ApolloReactComponents.Mutation<DestroyTodoMutation, DestroyTodoMutationVariables>
    mutation={DestroyTodoDocument}
    {...props}
  />
);

export type DestroyTodoProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  DestroyTodoMutation,
  DestroyTodoMutationVariables
> &
  TChildProps;
export function withDestroyTodo<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DestroyTodoMutation,
    DestroyTodoMutationVariables,
    DestroyTodoProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DestroyTodoMutation,
    DestroyTodoMutationVariables,
    DestroyTodoProps<TChildProps>
  >(DestroyTodoDocument, {
    alias: 'destroyTodo',
    ...operationOptions,
  });
}
export type DestroyTodoMutationResult = ApolloReactCommon.MutationResult<DestroyTodoMutation>;
export type DestroyTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyTodoMutation,
  DestroyTodoMutationVariables
>;
export const TodosDocument = gql`
  query Todos {
    todos {
      id
      name
      complete
    }
  }
`;
export type TodosComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<TodosQuery, TodosQueryVariables>,
  'query'
>;

export const TodosComponent = (props: TodosComponentProps) => (
  <ApolloReactComponents.Query<TodosQuery, TodosQueryVariables> query={TodosDocument} {...props} />
);

export type TodosProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  TodosQuery,
  TodosQueryVariables
> &
  TChildProps;
export function withTodos<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    TodosQuery,
    TodosQueryVariables,
    TodosProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<TProps, TodosQuery, TodosQueryVariables, TodosProps<TChildProps>>(
    TodosDocument,
    {
      alias: 'todos',
      ...operationOptions,
    }
  );
}
export type TodosQueryResult = ApolloReactCommon.QueryResult<TodosQuery, TodosQueryVariables>;
export type CreateTodoMutationVariables = {
  name: Scalars['String'];
};

export type CreateTodoMutation = { __typename?: 'Mutation' } & {
  createTodo: { __typename?: 'Todo' } & Pick<Todo, 'id' | 'name' | 'complete'>;
};

export type UpdateTodoMutationVariables = {
  id: Scalars['Int'];
  complete: Scalars['Boolean'];
};

export type UpdateTodoMutation = { __typename?: 'Mutation' } & {
  updateTodo: { __typename?: 'Todo' } & Pick<Todo, 'id' | 'name' | 'complete'>;
};

export type DestroyTodoMutationVariables = {
  id: Scalars['Int'];
};

export type DestroyTodoMutation = { __typename?: 'Mutation' } & {
  destroyTodo: { __typename?: 'Todo' } & Pick<Todo, 'id'>;
};

export type TodosQueryVariables = {};

export type TodosQuery = { __typename?: 'Query' } & {
  todos: Array<{ __typename?: 'Todo' } & Pick<Todo, 'id' | 'name' | 'complete'>>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  updateTodo: Todo;
  destroyTodo: Todo;
};

export type MutationCreateTodoArgs = {
  name: Scalars['String'];
};

export type MutationUpdateTodoArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  complete?: Maybe<Scalars['Boolean']>;
};

export type MutationDestroyTodoArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  name: Scalars['String'];
  complete: Scalars['Boolean'];
};
