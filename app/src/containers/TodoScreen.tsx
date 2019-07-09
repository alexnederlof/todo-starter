import React from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Content,
  List
} from "native-base";
import { ApolloProvider } from "react-apollo";
import { client } from "../utils/apolloClient";
import { TodosComponent } from "../generated/graphql";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";
import { NavigationScreenProps } from "react-navigation";

export default function HeaderIconTextButtonExample({
  navigation
}: NavigationScreenProps) {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Todos</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.push("About")}>
              <Text>About</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <CreateTodo />
          <List>
            <TodosComponent>
              {({ data }) =>
                (data && data.todos ? data.todos : []).map((todo, index) => (
                  <Todo key={index} todo={todo} />
                ))
              }
            </TodosComponent>
          </List>
        </Content>
      </Container>
    </ApolloProvider>
  );
}
