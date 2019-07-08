# Full-stack todo starter app

TypeScript with React, Apollo and Hasura example

## Setup

_Assumes MacOS_

### Install [Homebrew](https://brew.sh/)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install [Yarn](https://yarnpkg.com/)

```bash
brew install yarn
```

### Clone repo and cd to root of project

```bash
git clone https://github.com/tiagob/ts-react-apollo-node.git
cd ts-react-apollo-node
```

**All commands below are run from the root project directory `ts-react-apollo-node`.**

### Install dependencies

```bash
yarn install
```

## Setup [Firebase Authentication](https://firebase.google.com/docs/auth)

### Create and register Firebase

Complete steps [#1](https://firebase.google.com/docs/web/setup#create-project) and [#2](https://firebase.google.com/docs/web/setup#register-app) in the [setup docs](https://firebase.google.com/docs/web/setup)

### Setup the client for Firebase

Create and edit `client/.env` with your favorite editor (using vim)

```bash
vim client/.env
```

Copy the Firebase config variables (`apiKey`, `authDomain` and `projectId`) to `/client/.env`. Found in step [#2](https://firebase.google.com/docs/web/setup#register-app) or in [Project Settings Config](https://support.google.com/firebase/answer/7015592).

![Firebase Config](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/hasura-firebase-auth/assets/firebaseConfig.png)

```
REACT_APP_FIREBASE_API_KEY=apiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=authDomain
REACT_APP_FIREBASE_PROJECT_ID=projectId
```

**All [custom environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) on the client must be prefaced with `REACT_APP_`**

### Enable Google Sign-In in the Firebase console

1. In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
1. On the Sign in method tab, enable the Google sign-in method, add a "Project support email" and click Save.

### Setup [Firebase Functions](https://firebase.google.com/docs/functions) to authenticate Hasura

[Hasura authentication](https://docs.hasura.io/1.0/graphql/manual/auth/authentication/webhook.html) relies on a webhook which we'll setup on Firebase Functions.
![Hasura Webhook Auth](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/hasura-firebase-auth/assets/hasuraWebhookAuth.png)

Install the Firebase CLI

```bash
yarn global add firebase-tools
```

Login

```bash
firebase login
```

Replace `MY_FIREBASE_PROJECT_ID` in the command below with your Firebase project ID.

```bash
LC_ALL=C find . -type f \( -iname .firebaserc \) -exec sed -i '' s/\<FIREBASE_PROJECT_ID\>/MY_FIREBASE_PROJECT_ID/ {} +
```

Deploy

```
cd firebase
firebase deploy --only functions
```

Note the "Function URL (webhook)" (`MY_WEBHOOK_URL`). We'll need it later.

## Setup [Hasura](https://hasura.io/)

### Create an Hasura instance on Heroku

Adapting the Hasura [docs](https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html), [deploy a Heroku instance with Hasura](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) setup. Note your app name (`MY_APP_NAME`).

### Replace `<APP_NAME>` in this project with your Heroku app name

Replace `MY_HEROKU_APP_NAME` in the command below with your Heroku app name.

```bash
LC_ALL=C find . -type f \( -iname codegen.yml -o -iname config.yaml -o -iname apolloClient.tsx \) -exec sed -i '' s/\<HEROKU_APP_NAME\>/MY_HEROKU_APP_NAME/ {} +
```

### Initialize the database

Adapting commands from [Hasura migration docs](https://docs.hasura.io/1.0/graphql/manual/migrations/new-database.html)

Install the [hasura client](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli)

Apply migrations

```bash
cd hasura
hasura migrate apply
```

### Set the environment variables in Heroku

In the [Heroku Dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard) under "Settings" click "Reveal Config Vars" and add the folowing.

![Heroku Config Vars](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/hasura-firebase-auth/assets/herokuConfigVars.png)

Set the `HASURA_GRAPHQL_AUTH_HOOK` to your webhook URL from Firebase Functions. This is needed for user authentication.

```
HASURA_GRAPHQL_AUTH_HOOK=MY_WEBHOOK_URL
```

Set the admin secret to something you decide. `HASURA_GRAPHQL_AUTH_HOOK` can't be set without `HASURA_GRAPHQL_ADMIN_SECRET`. This secures the admin console and endpoints.

```
HASURA_GRAPHQL_ADMIN_SECRET=MY_HASURA_SECRET
```

### Replace `<HASURA_SECRET>` for GraphQL codegen

Replace `MY_HASURA_SECRET` in the command below with your Hasura secret.

```bash
LC_ALL=C find . -type f \( -iname codegen.yml \) -exec sed -i '' s/\<HASURA_SECRET\>/MY_HASURA_SECRET/ {} +
```

## View Hasura Console

Hasura console provides admin views for all postgres tables and a GraphQL playground to demo queries.

https://MY_HEROKU_APP_NAME.herokuapp.com/console

## Run

```bash
cd client
yarn watch
```

## Setup [VSCode](https://code.visualstudio.com/) (recommended IDE/Editor)

The config files (`.vscode/`) are included which formats on save and automatically attaches the debugger.

### Install recommended [extensions](https://code.visualstudio.com/docs/editor/extension-gallery)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)

### Debug client

Run `watch` from [VSCode terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

```bash
cd client
yarn watch
```

Press `F5` or click the green debug icon for `Chrome` [launch configuration](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) to attach.

## Code generation

Repo uses [graphql-code-generator](https://graphql-code-generator.com/). Client React components for GraphQL queries and mutations are automatically generated via the [typescript-react-apollo plugin](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo#usage) from the `*.graphql` files. This code is automattically generated when running `yarn watch`. It lives in the `/client/src/generated` folder.

## Gotchas

### EADDRINUSE, Address already in use

Kill all node processes.

```bash
killall node
```

## References

- [Hasura](https://hasura.io/)
- [TypesSript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL Codegen](https://graphql-code-generator.com/docs/getting-started/)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [dotenv](https://github.com/motdotla/dotenv)
