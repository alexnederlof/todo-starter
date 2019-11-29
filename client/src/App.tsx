import { grey } from '@material-ui/core/colors';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import { Page } from './constants';
import About from './containers/About';
import Todos from './containers/Todos';
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
    backgroundColor: grey[200],
  },

  topBarSpacer: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({});

export default function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <Header />
            <div className={classes.topBarSpacer}>
              <Route exact path="/" component={Todos} />
              <Route exact path="/users/:id" component={EditUserContainer} />
              <Route exact path="/users" component={UserListContainer} />
              <Route path={`/${Page.about}`} component={About} />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}
