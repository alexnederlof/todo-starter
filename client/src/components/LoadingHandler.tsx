import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { QueryResult } from 'react-apollo';

const useStyles = makeStyles({
  root: {},
});

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
      <div className={classes.root}>
        <h1>An error occured!</h1>
        <pre>{JSON.stringify(result.error, null, 2)}</pre>
      </div>
    );
  }
  return children(result.data!);
}
