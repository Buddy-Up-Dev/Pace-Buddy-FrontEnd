import { defaults, resolvers } from "./localState";
import { isLoggedInVar } from "./cache";
import { IS_LOGGED_IN } from "./queries/login/login";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
const END_POINT = process.env.REACT_APP_END_POINT;

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
  // uri: `${END_POINT}:3000/graphql`,
});
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        post: offsetLimitPagination(),
      },
    },
  },
});
//const cache = new InMemoryCache();
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("Token");
  console.log(token);
  if (token) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  clientState: {
    defaults,
    resolvers,
  },
});

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("Token"),
  },
});

export default client;
