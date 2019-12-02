import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { Page } from './constants';
import About from './containers/About';
import Todos from './containers/Todos';
import CreateUserContainer from './containers/users/CreateUserContainer';
import EditUserContainer from './containers/users/EditUserContainer';
import { UserListContainer } from './containers/users/UserListContainer';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#181822',
  },

  topBarSpacer: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#181822',
    },
    primary: {
      main: '#47FFaF',
    },
    secondary: {
      main: '#3A55FF',
    },
    error: {
      main: '#FFA246',
    },
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <Header />
            <div className={classes.topBarSpacer}>
              <Switch>
                <Route exact path="/todo" component={Todos} />
                <Route exact path="/users/new" component={CreateUserContainer} />
                <Route exact path="/users/:id" component={EditUserContainer} />
                <Route exact path="/users" component={UserListContainer} />
                <Route path={`/${Page.about}`} component={About} />
                <Route exact path="/" component={() => <Redirect to="/users" />} />
              </Switch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}
