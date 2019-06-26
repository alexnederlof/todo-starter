# Full-stack todo starter app

TypeScript with React, Apollo and Node example

## Setup

_Assumes MacOS_

### Install [Homebrew](https://brew.sh/)

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install [MySQL](https://www.mysql.com/)

Install MySQL with Homebrew ([MySQL commands on MacOS](https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e)).

```bash
brew install mysql
brew tap homebrew/services
```

Start MySQL

```bash
brew services start mysql
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

### Install dependencies

```bash
yarn install
```

### Setup database

Create database and sync (creating tables).

```bash
cd server
./createDb.sh  # Assumes MySQL is installed with Homebrew
yarn sync-db
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

![Firebase Config](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/tree/firebase-auth/firebaseConfig.png)

```
REACT_APP_FIREBASE_API_KEY=apiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=authDomain
REACT_APP_FIREBASE_PROJECT_ID=projectId
```

**All [custom environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) on the client must be prefaced with `REACT_APP_`**

### Setup the server for Firebase

Generate and download the Firebase Application Credentials into `server/keys`. Note the firebase generated json key path.

1. In the Firebase console, open Project Settings > [Service Accounts](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).
1. Click Generate New Private Key, then confirm by clicking Generate Key.

Create and edit `server/.env` with your favorite editor (using vim)

```bash
vim server/.env
```

Replace `MY_GENERATED_FIREBASE_KEY_PATH` with the full path to your firebase generated json key.

```
GOOGLE_APPLICATION_CREDENTIALS=MY_GENERATED_FIREBASE_KEY_PATH
```

### Enable Google Sign-In in the Firebase console

1. In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
1. On the Sign in method tab, enable the Google sign-in method, add a "Project support email" and click Save.

## Run

Create two bash terminals (terminal 1, terminal 2). `cd` into the root of the cloned repo in both.

In terminal 1

```bash
cd server
yarn watch
```

In terminal 2

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

### Debug server

Run `watch-debug` from [VSCode terminal](https://code.visualstudio.com/docs/editor/integrated-terminal). Debugger automattically attaches. See [debugging in VSCode](https://code.visualstudio.com/docs/editor/debugging).

```bash
cd server
yarn watch-debug
```

## Code generation

Repo uses [graphql-code-generator](https://graphql-code-generator.com/). Client React components for GraphQL queries and mutations are automatically generated via the [typescript-react-apollo plugin](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo#usage) from the `*.graphql` files. Server relies on type generation via the [typescript plugin](https://graphql-code-generator.com/docs/plugins/typescript). This code is automattically generated when running `yarn watch` for client and server. It lives in the `/src/generated` folder in both `/client` and `/server`.

## Gotchas

### EADDRINUSE, Address already in use

Kill all node processes.

```bash
killall node
```

## References

- [TypesScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Codegen](https://graphql-code-generator.com/docs/getting-started/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [dotenv](https://github.com/motdotla/dotenv)
