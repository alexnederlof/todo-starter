import React, { useState } from 'react';
import { Permission } from '../../generated/graphql';
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

export interface Props {
  onCreate: (name: string, email: string, permissions: Permission[]) => void;
  error?: Error | string;
  saving: boolean;
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

const emptyText = { value: '', valid: false };

export default function CreateUser({ onCreate, saving, error }: Props) {
  const classes = useStyles();
  const [name, setName] = useState<ValidatedText>(emptyText);
  const [email, setEmail] = useState<ValidatedText>(emptyText);

  function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (!name.valid || !email.valid) {
      return;
    }
    onCreate(name.value, email.value, []);
  }

  return (
    <Grid container={true} justify="center" alignItems="flex-start">
      <Grid item={true} xs={12} sm={11}>
        <Paper className={classes.root}>
          <form autoComplete="off">
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

            <Button
              className={classes.formItem}
              disabled={saving || !name.valid || !email.valid}
              color="primary"
              type="submit"
              variant="contained"
              onClick={event => onSubmit(event)}
            >
              Create {name.value}
            </Button>
            {saving && <CircularProgress />}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
