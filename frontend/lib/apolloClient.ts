import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext(() => {
  if (typeof window === "undefined") {
    return { headers: {} };
  }

  const token = localStorage.getItem("token");

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError((errorResponse) => {
  const { graphQLErrors, networkError } = errorResponse as any;
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }: any) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    });
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
