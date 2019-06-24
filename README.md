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

### Install dependencies

```bash
yarn install
```

## Setup [Hasura](https://hasura.io/)

### Create an Hasura instance on Heroku

Adapting the Hasura [docs](https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html), [deploy a Heroku instance with Hasura](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) setup. Note your `app name`.

### Replace `<APP_NAME>` in this project with your Heroku app name

Replace `MY_APP_NAME` in the command below with your Heroku app name.

```bash
LC_ALL=C find . -type f \( -iname codegen.yml -o -iname config.yaml -o -iname App.tsx \) -exec sed -i '' s/\<APP_NAME\>/MY_APP_NAME/ {} +
```

### Initialize the database

Adapting commands from [Hasura migration docs](https://docs.hasura.io/1.0/graphql/manual/migrations/new-database.html)

Set `HASURA_GRAPHQL_ENABLE_CONSOLE=false` enviornment variable in the [Heroku Dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).

Install the hasura client
https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli

Apply migrations. Assuming from the root project directory `ts-react-apollo-node`

```bash
cd hasura
hasura migrate apply --version "1560790778833"
```

## View Hasura Console

Hasura console provides admin views for all postgres tables and a GraphQL playground to demo queries on. Assuming from the root project directory `ts-react-apollo-node`

```bash
cd hasura
hasura console
```

## Run

Assuming from the root project directory `ts-react-apollo-node`

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
