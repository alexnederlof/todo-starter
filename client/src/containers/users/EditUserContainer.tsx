import { Snackbar, SnackbarContent } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import LoadingHandler from '../../components/LoadingHandler';
import EditUser from '../../components/users/EditUser';
import {
  UpdateUserMutationVariables,
  useUserQuery,
  useUpdateUserMutation,
} from '../../generated/graphql';

export default function EditUserContainer() {
  const { id } = useParams();
  const [error, setError] = useState<Error | string | undefined>();
  const [saving, setSaving] = useState(false);
  const [successBarVisible, showSuccessBar] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const result = useUserQuery({
    variables: { id: id! },
  });

  const [updateUser] = useUpdateUserMutation();

  if (!successBarVisible && location.state?.userCreated) {
    showSuccessBar(true);
    const stateCopy = location.state || {};
    delete stateCopy.userCreated;
    history.replace(history.location.pathname, stateCopy);
  }

  const onSave = async (user: UpdateUserMutationVariables) => {
    try {
      setSaving(true);
      await updateUser({
        variables: user,
      });
      showSuccessBar(true);
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
        open={successBarVisible}
        autoHideDuration={5000}
        onClose={() => {
          console.log('Closing');
          showSuccessBar(false);
        }}
      >
        <SnackbarContent message="Saved" />
      </Snackbar>
      <LoadingHandler result={result}>
        {({ user }) => <EditUser user={user!} saving={saving} error={error} onSave={onSave} />}
      </LoadingHandler>
    </>
  );
}
