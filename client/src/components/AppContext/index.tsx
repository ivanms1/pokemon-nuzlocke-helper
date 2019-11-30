import React, { useState, useMemo, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
// import { useHistory } from 'react-router';

import {
  getAccessToken,
  isTokenValid,
  setAccessToken
} from '../../accessToken';

const Context = React.createContext<any>(null);

interface AppWrapperProps {
  children: React.ReactNode;
}

const token = getAccessToken();

const AppProvider = ({ children }: AppWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid(token));
  const [loading, setLoading] = useState(true);

  // const history = useHistory();
  const client = useApolloClient();

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
      onLogout: () => {
        // history.replace('/login');
        client.resetStore();
        setIsAuthenticated(false);
      }
    }),
    [client, isAuthenticated]
  );
  if (loading) {
    return null;
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { AppProvider };

export default Context;
