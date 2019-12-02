import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import CreateUser from '../../components/users/CreateUser';
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
} from '../../generated/graphql';

export default function CreateUserContainer() {
  const [error, setError] = useState<Error | string | undefined>();
  const [saving, setSaving] = useState(false);
  const history = useHistory();
  const [createUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  );
  return (
    <CreateUser
      saving={saving}
      error={error}
      onCreate={async (name, email, permissions) => {
        try {
          setSaving(true);
          const { data } = await createUser({ variables: { name, email, permissions } });
          console.log('result', data);
          history.push(`/users/${data!.createUser.id}`, { userCreated: true });
        } catch (e) {
          setError(e);
          setSaving(false);
          console.log('error ' + e, e);
        }
      }}
    />
  );
}
