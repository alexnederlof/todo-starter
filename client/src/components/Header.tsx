import { Button, Link, makeStyles, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { Page } from '../constants';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  topBar: {
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid gray',
  },
}));

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink innerRef={ref as any} {...props} />
));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="sticky" color="default" className={classes.topBar}>
      <Toolbar className={classes.toolbar}>
        <Link component={AdapterLink} color="inherit" to="/">
          <Typography variant="h6" color="inherit">
            Users
          </Typography>
        </Link>
        <Button color="inherit" component={AdapterLink} to={`/${Page.about}`}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
