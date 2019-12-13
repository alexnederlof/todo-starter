# Full-stack todo starter app

TypeScript with React, Apollo and Node example

**All commands below are run from the root project directory `todo-starter`.**

### Install dependencies

```bash
yarn
```

### Setup database

Create database and sync (creating tables).

```bash
cd server
yarn sync-db
```

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

-   [TypesScript](https://www.typescriptlang.org/)
-   [React](https://reactjs.org/)
-   [Apollo Client](https://www.apollographql.com/docs/react/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
-   [GraphQL Codegen](https://graphql-code-generator.com/docs/getting-started/)
-   [Sequelize](http://docs.sequelizejs.com/)
-   [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
