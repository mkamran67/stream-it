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
