// Apollo client instance
import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // Create an authentication link for client
  const authLink = setContext((_, { headers }) => {
    // get Auth token from storage if it exists
    // sessionStorage or localStorage
    // sessionStorage clears variables when the tab is closed -> more secure
    // localStorage sticks until deleted or expires
    const token = sessionStorage.getItem('token');

    // reutrn the headers to the context so httplink cna read them
    return {
      headers: {
        ...headers,
        authorization: token ? 'Bearer ' + token : '',
      },
    };
  });
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

// init ApolloClient with context and initial state
export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Initial state gets re-hydrated
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // for SSR or SSG always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // create the apollo client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
