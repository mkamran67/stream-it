import { useState, useContext, createContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

import { useSignInMutation } from 'lib/graphql/signin.graphql';
import { useSignUpMutation } from 'lib/graphql/signup.graphql';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';

// Declaring types
type AuthProps = {
  user: any;
  error: string;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (email: any, password: any) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<Partial<AuthProps>>({});

// You can wrap your _app.tsx with this provider so all of the underlining children will have Auth context
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom react hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const client = useApolloClient();
  const router = useRouter();

  const [error, setError] = useState('');
  const { data } = useCurrentUserQuery({
    // network-only - So user data/authentication is always done via server not cache.
    fetchPolicy: 'network-only',
    // ignore errors so the app doesn't crash, remove for debugging
    errorPolicy: 'ignore',
  });

  const user = data && data.currentUser;

  // Signing In and Signing Up
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await signInMutation({ variables: { email, password } });
      console.log(data);

      if (data.login.token && data.login.user) {
        sessionStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      const { data } = await signUpMutation({ variables: { email, password } });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem('token', data.register.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('token');
    client.resetStore().then(() => {
      router.push('/');
    });
  };

  return {
    user,
    error,
    signIn,
    signOut,
    signUp,
  };
}
