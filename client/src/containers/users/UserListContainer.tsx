import React, { useEffect, useState } from 'react';
import LoadingHandler from '../../components/LoadingHandler';
import { UserList } from '../../components/users/UserList';
import { useUsersLazyQuery } from '../../generated/graphql';

export function UserListContainer() {
  const [searchUsers, result] = useUsersLazyQuery();
  const [query, setQuery] = useState('');

  useEffect(() => {
    searchUsers({ variables: { query } });
  }, [query]);

  return (
    <LoadingHandler result={result}>
      {data => <UserList users={data.users!} query={query} onSearch={setQuery} />}
    </LoadingHandler>
  );
}
