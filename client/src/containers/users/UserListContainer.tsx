import React from 'react';
import LoadingHandler from '../../components/LoadingHandler';
import { UserList } from '../../components/users/UserList';
import { UsersComponent } from '../../generated/graphql';

export function UserListContainer() {
  return (
    <UsersComponent>
      {result => (
        <LoadingHandler result={result}>{data => <UserList users={data.users!} />}</LoadingHandler>
      )}
    </UsersComponent>
  );
}
