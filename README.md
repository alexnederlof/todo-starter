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

## Setup [Hasura](https://hasura.io/)

### Create an Hasura instance on Heroku

[Deploy a Heroku instance with Hasura](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku). Note your `app name`.

### Replace `<APP_NAME>` in this project with your Heroku app name

Replace `MY_APP_NAME` in the command below with your Heroku app name.

```bash
LC_ALL=C find . -type f \( -iname codegen.yml -o -iname config.yaml -o -iname App.tsx \) -exec sed -i '' s/\<APP_NAME\>/MY_APP_NAME/ {} +
```

### Initialize the database

Adapting commands from [Hasura migration docs](https://docs.hasura.io/1.0/graphql/manual/migrations/new-database.html)

Install the hasura client
https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli

Apply migrations

```bash
cd hasura
hasura migrate apply
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
