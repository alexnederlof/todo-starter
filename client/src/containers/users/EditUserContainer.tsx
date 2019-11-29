import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CreateUser from '../../components/users/CreateUser';
import { CreateUserComponent } from '../../generated/graphql';

export default function EditUserContainer() {
  const { id } = useParams();
  const [error, setError] = useState<Error | string | undefined>();
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  if (id === 'new') {
    return (
      <CreateUserComponent>
        {create => (
          <CreateUser
            saving={saving}
            error={error}
            onCreate={async (name, email, permissions) => {
              try {
                setSaving(true);
                const result = await create({ variables: { name, email, permissions } });
                console.log('result', result);
                history.push('/users');
              } catch (e) {
                setError(e);
                console.log('error ' + e, e);
              } finally {
                setSaving(false);
              }
            }}
          />
        )}
      </CreateUserComponent>
    );
  } else {
    return <div>User {id} </div>;
  }
}
