# Full-stack todo starter app

TypeScript with React and Firestore example

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

## Setup Firebase

### Create and register Firebase

Complete steps [#1](https://firebase.google.com/docs/web/setup#create-project) and [#2](https://firebase.google.com/docs/web/setup#register-app) in the [setup docs](https://firebase.google.com/docs/web/setup)

### Setup the client for Firebase

Create and edit `client/.env` with your favorite editor (using vim)

```bash
vim client/.env
```

Copy the Firebase config variables (`apiKey`, `authDomain` and `projectId`) to `/client/.env`. Found in step [#2](https://firebase.google.com/docs/web/setup#register-app) or in [Project Settings Config](https://support.google.com/firebase/answer/7015592).

![Firebase Config](https://raw.githubusercontent.com/tiagob/ts-react-apollo-node/firebase-auth/firebaseConfig.png)

```
REACT_APP_FIREBASE_API_KEY=apiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=authDomain
REACT_APP_FIREBASE_PROJECT_ID=projectId
```

**All [custom environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) on the client must be prefaced with `REACT_APP_`**

### Create a Cloud Firestore database

Follow the instructions on the [docs](https://firebase.google.com/docs/firestore/quickstart).

### Setup database rules

In the Cloud Firestore section of the Firebase console [Rules tab](https://console.firebase.google.com/project/_/database/firestore/rules) paste this configuration:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Make sure the uid of the requesting user matches name of the user
    // document. The wildcard expression {userId} makes the userId variable
    // available in rules.
    match /users/{userId}/todos/{todoId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### Enable Google Sign-In in the Firebase console

1. In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
1. On the Sign in method tab, enable the Google sign-in method, add a "Project support email" and click Save.

## Run

```bash
cd client
yarn start
```

## Setup [VSCode](https://code.visualstudio.com/) (recommended IDE/Editor)

The config files (`.vscode/`) are included which formats on save and automatically attaches the debugger.

### Install recommended [extensions](https://code.visualstudio.com/docs/editor/extension-gallery)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

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

- [TypesScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [dotenv](https://github.com/motdotla/dotenv)
