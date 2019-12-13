import React from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../generated/graphql';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableHead,
  Theme,
  TableCell,
  TableRow,
  TableBody,
  TextField,
  Button,
} from '@material-ui/core';

export interface Props {
  users: Pick<User, 'id' | 'name' | 'email' | 'deactivated'>[];
  onSearch: (query: string) => void;
  query: string;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(1),
  },
  toolbar: {
    padding: spacing(1),
  },

  addUser: {
    float: 'right',
  },

  clickable: {
    '&:hover': {
      backgroundColor: 'red',
      color: 'red',
    },
  },
}));

export function UserList({ users, onSearch, query }: Props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container={true} justify="center" alignItems="flex-start">
      <Grid item={true} xs={12} sm={11}>
        <Paper className={classes.root}>
          <Grid item={true} className={classes.toolbar}>
            <TextField
              placeholder="Search"
              value={query}
              autoFocus={true}
              onChange={event => onSearch(event.target.value)}
            ></TextField>
            <Button
              href="/users/new"
              variant="contained"
              color="secondary"
              className={classes.addUser}
            >
              Create user
            </Button>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2}>No users found</TableCell>
                </TableRow>
              )}
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  hover={true}
                  className={classes.clickable}
                  onClick={event => history.push(`/users/${user.id}`)}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
