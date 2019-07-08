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
git clone https://github.com/tiagob/todo-starter.git
cd todo-starter
git checkout google-auth
```

**All commands below are run from the root project directory `todo-starter`.**

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

## Setup Google Auth

### Configure a project

Complete the `CONFIGURE A PROJECT` flow on the [Google Auth docs](https://developers.google.com/identity/sign-in/web/sign-in).

![Configure a Project](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/google-auth/ReadmeImages/configureAProject.png)

Configure OAuth Client by selecting `Web browser` and adding `http://localhost:3000` to the authorized Javascript origin.

![Configure OAuth Client](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/google-auth/ReadmeImages/configureOAuthClient.png)

Copy your generated Client ID.

![Copy Client ID](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/google-auth/ReadmeImages/copyClientId.png)

### Add Client ID to `client/.env`

Create and edit `client/.env` with your favorite editor (using vim)

```bash
vim client/.env
```

Replace `clientId` with your generated Client ID.

```
REACT_APP_OAUTH2_CLIENT_ID=clientId
```

**All [custom environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) on the client must be prefaced with `REACT_APP_`**

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

## Google OAuth

Not setup to use refresh tokens because that [requires the client secret](https://developers.google.com/identity/protocols/OAuth2WebServer#exchange-authorization-code) which shouldn't be exposed on the web site. It's simpler to log out the user when the access token expires (what we're doing) instead of handling refresh requests on the server.

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
- [Google Authentication](https://developers.google.com/identity/protocols/OAuth2UserAgent)
- [dotenv](https://github.com/motdotla/dotenv)
