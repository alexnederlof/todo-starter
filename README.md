# Full-stack todo starter app

TypeScript with React, Expo, Apollo and Node example

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
git clone https://github.com/tiagob/todo-starter.git
cd todo-starter
```

**All commands below are run from the root project directory `todo-starter`.**

### Install [Expo](https://docs.expo.io)

```bash
yarn global add expo-cli
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

## Run

### Server

**Must be running for Website or App to write and read from DB**

```bash
yarn watch-server
```

### Web

```bash
yarn watch-web
```

### App

```bash
yarn watch-app
```

## Setup [VSCode](https://code.visualstudio.com/) (recommended IDE/Editor)

The config files (`.vscode/`) are included which formats on save and automatically attaches the debugger.

### Install recommended [extensions](https://code.visualstudio.com/docs/editor/extension-gallery)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)

### Debug web

Run `watch` from [VSCode terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

```bash
yarn watch-web
```

Press `F5` or click the green debug icon for `Chrome` [launch configuration](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) to attach.

### Debug server

Run `watch-debug` from [VSCode terminal](https://code.visualstudio.com/docs/editor/integrated-terminal). Debugger automattically attaches. See [debugging in VSCode](https://code.visualstudio.com/docs/editor/debugging).

```bash
yarn watch-server-debug
```

## Code generation

Repo uses [graphql-code-generator](https://graphql-code-generator.com/). Client React components for GraphQL queries and mutations are automatically generated via the [typescript-react-apollo plugin](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo#usage) from the `*.graphql` files. Server relies on type generation via the [typescript plugin](https://graphql-code-generator.com/docs/plugins/typescript). This code is automattically generated when running commands from the workspace root.

## Gotchas

### EADDRINUSE, Address already in use

Kill all node processes.

```bash
killall node
```

### Hooks can only be called inside the body of a function component

React in both `app/package.json` and `web/package.json` need to be the same version since they're shared in Yarn Workspaces (unless you add [nohoist](https://yarnpkg.com/blog/2018/02/15/nohoist/)).

### Yarn Workspaces with Expo

Using [expo-yarn-workspaces](https://www.npmjs.com/package/expo-yarn-workspaces) which provides a workaround to make Yarn Workspaces work with Expo. We need Yarn Workspaces to share code between `web/` and `app/`.

## References

- [TypesScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://docs.expo.io)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Codegen](https://graphql-code-generator.com/docs/getting-started/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
