import { Typography } from '@material-ui/core';
import * as qs from 'query-string';
import React from 'react';
import { useAuthorizeWithGithubMutation } from '../../generated/graphql';

export function CallbackContainer() {
  const { code } = qs.parse(window.location.search);
  const [authorize, { data, error, loading, called }] = useAuthorizeWithGithubMutation({
    variables: {
      code: code as string,
    },
  });

  console.log('Authorized', [data, error, loading, called]);
  if (!called) {
    authorize();
  }

  if (error) {
    return (
      <div style={{ color: 'white' }}>
        Error:<pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (data && data.authorizeWithGithub) {
    console.log('Got data');
    const { token, user } = data.authorizeWithGithub;
    console.log('Setting my token in the session storage for', [token, user]);
    window.sessionStorage.setItem('auth_token', token);
    window.location.href = '/';
  }

  return <Typography variant="body1">Authenticating...</Typography>;
}
