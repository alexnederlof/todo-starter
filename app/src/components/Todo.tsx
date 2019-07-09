import React from "react";
import {
  Todo as TodoType,
  UpdateTodoComponent,
  TodosQuery,
  TodosQueryVariables,
  TodosDocument,
  DestroyTodoComponent
} from "../generated/graphql";
import {
  Left,
  Text,
  Right,
  ListItem,
  Button,
  Icon,
  CheckBox
} from "native-base";

interface Props {
  todo: TodoType;
}

export default function Todo({ todo }: Props) {
  return (
    <UpdateTodoComponent
      update={(cache, { data }) => {
        if (!data) {
          return;
        }
        const updateTodo = data.updateTodo;
        const query = cache.readQuery<TodosQuery, TodosQueryVariables>({
          query: TodosDocument
        });
        if (query) {
          const { todos } = query;
          cache.writeQuery<TodosQuery, TodosQueryVariables>({
            query: TodosDocument,
            data: {
              todos: todos.map(todo =>
                todo.id === updateTodo.id ? updateTodo : todo
              )
            }
          });
        }
      }}
    >
      {updateTodo => (
        <ListItem>
          <Left>
            <CheckBox
              onPress={() =>
                updateTodo({
                  variables: { id: todo.id, complete: !todo.complete }
                })
              }
              checked={todo.complete}
              style={{ marginRight: 40 }}
            />
            <Text
              style={
                todo.complete
                  ? {
                      textDecorationLine: "line-through"
                    }
                  : undefined
              }
            >
              {todo.name}
            </Text>
          </Left>
          <Right>
            <DestroyTodoComponent
              update={(cache, { data }) => {
                if (!data) {
                  return;
                }
                const destroyTodo = data.destroyTodo;
                const query = cache.readQuery<TodosQuery, TodosQueryVariables>({
                  query: TodosDocument
                });
                if (query) {
                  const { todos } = query;
                  cache.writeQuery<TodosQuery, TodosQueryVariables>({
                    query: TodosDocument,
                    data: {
                      todos: todos.filter(todo => todo.id !== destroyTodo.id)
                    }
                  });
                }
              }}
            >
              {destroyTodo => (
                <Button
                  onPress={() => destroyTodo({ variables: { id: todo.id } })}
                >
                  <Icon active name="trash" />
                </Button>
              )}
            </DestroyTodoComponent>
          </Right>
        </ListItem>
      )}
    </UpdateTodoComponent>
  );
}
