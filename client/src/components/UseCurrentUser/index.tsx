import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { get } from 'lodash';

const QUERY_CURRENT_USER = loader('./currentUser.graphql');

const useCurrentUser = () => {
  const { loading, data, error } = useQuery(QUERY_CURRENT_USER);

  return {
    loading,
    data,
    error,
    currentUser: get(data, 'currentUser')
  };
};

export default useCurrentUser;
