import { createHttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { oauth2Client } from "./oauth2Client";

const uri = "http://localhost:4000/graphql";

const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = oauth2Client.credentials.id_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
