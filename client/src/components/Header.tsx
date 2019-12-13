import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useMeLazyQuery, useMeQuery } from '../generated/graphql';
import {
  Avatar,
  CircularProgress,
  Link,
  makeStyles,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  topBar: {
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid gray',
  },

  avatar: {},
}));

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink innerRef={ref as any} {...props} />
));

function reloadToken() {
  window.sessionStorage.clear();
  window.location.href = '';
}

function logOut() {
  window.sessionStorage.clear();
  window.location.href = 'https://google.com';
}

export default function Header() {
  const classes = useStyles();
  const [getMe, { data, called }] = useMeLazyQuery();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  let meContainer = <CircularProgress />;

  if (window.sessionStorage.getItem('auth_token') && !called) {
    // Only execute when we've logged in
    getMe();
  }

  if (data) {
    const me = data.me;
    let avatar;
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    if (me.avatar) {
      avatar = (
        <Avatar onClick={handleClick} src={me.avatar!} alt={me.name!} className={classes.avatar} />
      );
    } else {
      let abbriviation = (me.name || '')
        .split(' ')
        .map(x => x.substring(0, 1))
        .join('');
      avatar = <Avatar>{abbriviation}</Avatar>;
    }

    meContainer = (
      <div>
        {avatar}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PopoverClasses={{}}
        >
          <MenuItem onClick={reloadToken}>Reload token</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <AppBar position="sticky" color="default" className={classes.topBar}>
      <Toolbar className={classes.toolbar}>
        <Link component={AdapterLink} color="inherit" to="/">
          <Typography variant="h6" color="inherit">
            Users
          </Typography>
        </Link>
        {meContainer}
      </Toolbar>
    </AppBar>
  );
}
