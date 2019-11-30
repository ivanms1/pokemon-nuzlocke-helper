import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Operation, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

import { getAccessToken, setAccessToken, isTokenValid } from './accessToken';

const request = async (operation: Operation) => {
  const token = getAccessToken();
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        return !isTokenValid(token);
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh-token', {
          method: 'POST',
          credentials: 'include'
        });
      },
      handleFetch: token => {
        setAccessToken(token);
      },
      handleError: err => {
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include'
    })
  ]),

  cache: new InMemoryCache()
});

export default client;
