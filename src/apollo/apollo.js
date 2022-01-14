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
        getAllLatestPost: {
          keyArgs: false,
          merge: (existing = [], incoming, { args }) => {
            console.log(existing["Post"]);

            const offset = args?.offset || 0;
            //console.log(
            //  "MERGE",
            //  offset,
            //  existing?.map(({ __ref }) => __ref),
            //  incoming.map(({ __ref }) => __ref));
            return !offset
              ? incoming["PostData"]
              : [existing["PostData"], incoming["PostData"]];
          },
        },
        // resourceCollection: offsetLimitPagination(),
        // keyArgs: false,
        // merge(existing, incoming) {
        //   if (!incoming) return existing;
        //   if (!existing) return incoming; // existing will be empty the first time

        //   const { items, ...rest } = incoming;

        //   let result = rest;
        //   result.items = [...existing.items, ...items]; // Merge existing items with the items from incoming
        //   console.log(result);
        //   return result;
        // },
      },
    },
  },
});
//const cache = new InMemoryCache();
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("Token");
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
