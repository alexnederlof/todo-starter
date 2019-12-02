import React, { useState } from 'react';
import { UpdateUserMutationVariables, User } from '../../generated/graphql';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  CircularProgress,
} from '@material-ui/core';

export type MutableUserFields = Pick<User, 'name' | 'email' | 'permissions' | 'deactivated'>;

export interface Props {
  onSave: (toUpdate: UpdateUserMutationVariables) => void;
  error?: Error | string;
  saving: boolean;
  user: Pick<User, 'id' | 'name' | 'email' | 'permissions' | 'deactivated'>;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(1),
  },
  formItem: {
    marginTop: spacing(2),
  },
}));

interface ValidatedText {
  value: string;
  valid: boolean;
}

export default function EditUser({ user, onSave, saving, error }: Props) {
  const classes = useStyles();
  const [name, setName] = useState<ValidatedText>({
    value: user.name!,
    valid: true,
  });
  const [email, setEmail] = useState<ValidatedText>({
    value: user.email!,
    valid: true,
  });

  function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (!name.valid || !email.valid) {
      return;
    }
    onSave({
      id: `${user.id}`,
      name: name.value,
      permissions: [],
      deactivated: false,
    });
  }

  return (
    <Grid container={true} justify="center" alignItems="flex-start">
      <Grid item={true} xs={12} sm={11}>
        <Paper className={classes.root}>
          <form>
            <Grid xs={12} item={true}>
              <TextField
                className={classes.formItem}
                id="standard-basic"
                label="Name"
                type="name"
                value={name.value}
                required={true}
                onChange={change =>
                  setName({
                    value: change.target.value,
                    valid: change.target.validity.valid,
                  })
                }
              />
            </Grid>
            <Grid xs={12} item={true}>
              <TextField
                className={classes.formItem}
                id="standard-basic"
                label="Email"
                type="email"
                required={true}
                value={email.value}
                onChange={change =>
                  setEmail({
                    value: change.target.value,
                    valid: change.target.validity.valid,
                  })
                }
              />
            </Grid>

            {error && (
              <Typography
                style={{
                  color: 'red',
                }}
              >
                Could not save user
              </Typography>
            )}

            <div>Permissions {user!.permissions!.join(' ')}</div>

            <Button
              className={classes.formItem}
              disabled={saving || !name.valid || !email.valid}
              color="primary"
              type="submit"
              variant="contained"
              onClick={event => onSubmit(event)}
            >
              Save
            </Button>
            {saving && <CircularProgress />}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
