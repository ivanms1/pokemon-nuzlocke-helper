import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import {
  getAccessToken,
  isTokenValid,
  setAccessToken
} from '../../accessToken';

const MUTATION_LOGOUT = loader('./mutationLogout.graphql');

const Context = React.createContext<any>(null);

interface AppWrapperProps {
  children: React.ReactNode;
}

const token = getAccessToken();

const AppProvider = ({ children }: AppWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid(token));
  const [loading, setLoading] = useState(true);

  const [logout, { client }] = useMutation(MUTATION_LOGOUT);

  useEffect(() => {
    if (!isAuthenticated) {
      fetch('http://localhost:4000/refresh-token', {
        method: 'POST',
        credentials: 'include'
      }).then(async res => {
        const data = await res.json();
        if (!data.ok) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
        setLoading(false);
      });
    }
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      onLogin: (token: string) => {
        setAccessToken(token);
        setIsAuthenticated(true);
      },
      onLogout: async () => {
        await logout();
        setAccessToken('');
        setIsAuthenticated(false);
        client!.resetStore();
      }
    }),
    [client, isAuthenticated, logout]
  );
  if (loading) {
    return null;
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { AppProvider };

export default Context;
