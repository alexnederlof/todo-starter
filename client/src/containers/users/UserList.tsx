import React from 'react';
import LoadingHandler from '../../components/LoadingHandler';
import { UserList as UserListComponent } from '../../components/users/UserList';
import { UsersComponent } from '../../generated/graphql';

export function UserList() {
  return (
    <UsersComponent>
      {result => (
        <LoadingHandler result={result}>
          {data => <UserListComponent users={data.users!} />}
        </LoadingHandler>
      )}
    </UsersComponent>
  );
}
