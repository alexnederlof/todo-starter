import { Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { QueryResult } from 'react-apollo';

const useStyles = makeStyles((theme: Theme) => ({
  withPadding: {
    padding: theme.spacing(2),
  },

  errorBox: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.error.main}`,
  },

  largeIcon: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

interface Props<T> {
  result: QueryResult<T>;
  children: (data: T) => JSX.Element;
}

export default function LoadingHandler<T>({ result, children }: Props<T>) {
  const classes = useStyles();
  if (result.loading) {
    return <div>Loading...</div>;
  } else if (result.error) {
    return (
      <div className={classes.withPadding}>
        <Paper className={classes.errorBox}>
          <Typography variant="h2">An error occured!</Typography>
          <pre>{JSON.stringify(result.error, null, 2)}</pre>
        </Paper>
      </div>
    );
  }
  return children(result.data!);
}
