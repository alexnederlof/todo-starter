import { makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { User } from '../../generated/graphql';

export interface Props {
  users: Pick<User, 'id' | 'name'>[];
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(1),
    width: '80%',
  },
}));

export function UserList({ users }: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      I'm a user list
      <ul>
        {users.map(user => (
          <li>
            {user.id} {user.name}
          </li>
        ))}
      </ul>
    </Paper>
  );
}
