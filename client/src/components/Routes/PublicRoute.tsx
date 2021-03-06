import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import Context from '../AppContext';
import LoadingPage from '../Loading/LoadingPage';

const QUERY_GET_CURRENT_USER = loader('./queryGetCurrentUser.graphql');

interface PublicRouteProps {
  path: string;
  children: React.ReactNode;
  exact?: boolean;
}

const PublicRoute = ({ path, children, ...props }: PublicRouteProps) => {
  const { isAuthenticated } = useContext(Context);
  const { data, loading } = useQuery(QUERY_GET_CURRENT_USER, {
    skip: !isAuthenticated
  });

  if (isAuthenticated) {
    if (loading) {
      return <LoadingPage />;
    }
    return <Redirect to={`/profile/${data.user.id}`} />;
  }

  return (
    <Route path={path} {...props}>
      {children}
    </Route>
  );
};

export default PublicRoute;
