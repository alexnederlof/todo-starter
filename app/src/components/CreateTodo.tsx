import React, { useState } from "react";
import { Item, Input } from "native-base";
import {
  CreateTodoComponent,
  TodosQuery,
  TodosDocument,
  TodosQueryVariables
} from "../generated/graphql";

const styles = {
  root: {
    margin: 10
  }
};

export default function CreateTodo() {
  const [name, setName] = useState("");

  return (
    <CreateTodoComponent
      update={(cache, { data }) => {
        if (!data) {
          return;
        }
        const createTodo = data.createTodo;
        const query = cache.readQuery<TodosQuery, TodosQueryVariables>({
          query: TodosDocument
        });
        if (query) {
          const { todos } = query;
          cache.writeQuery<TodosQuery, TodosQueryVariables>({
            query: TodosDocument,
            data: { todos: todos.concat([createTodo]) }
          });
        }
      }}
    >
      {createTodo => (
        <Item rounded style={styles.root}>
          <Input
            placeholder="What needs to be done?"
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => {
              createTodo({ variables: { name } }).then(() => setName(""));
            }}
          />
        </Item>
      )}
    </CreateTodoComponent>
  );
}
