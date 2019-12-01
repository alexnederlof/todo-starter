import { Snackbar, SnackbarContent } from '@material-ui/core';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import LoadingHandler from '../../components/LoadingHandler';
import EditUser from '../../components/users/EditUser';
import {
  UserDocument,
  UserQuery,
  UserQueryVariables,
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../generated/graphql';

export default function EditUserContainer() {
  const { id } = useParams();
  const [error, setError] = useState<Error | string | undefined>();
  const [saving, setSaving] = useState(false);
  const [showSnackbar, setSnackBarOn] = useState(false);
  const result = useQuery<UserQuery, UserQueryVariables>(UserDocument, {
    variables: { id: id! },
  });

  const [updateUser] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  );

  const onSave = async (user: UpdateUserMutationVariables) => {
    try {
      setSaving(true);
      await updateUser({
        variables: user,
      });
    } catch (e) {
      setError(e);
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setSnackBarOn(false)}
      >
        <SnackbarContent message="Saved" />
      </Snackbar>
      <LoadingHandler result={result}>
        {({ user }) => <EditUser user={user!} saving={saving} error={error} onSave={onSave} />}
      </LoadingHandler>
    </>
  );
}
