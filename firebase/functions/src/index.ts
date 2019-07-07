import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// Adapted from Hasura docs
// https://github.com/hasura/graphql-engine/blob/master/community/boilerplates/auth-webhooks/nodejs-express/firebase/firebaseHandler.js
export const webhook = functions.https.onRequest((request, response) => {
  // Get authorization headers
  const authHeaders = request.get("Authorization");
  // Send anonymous role if there are no auth headers
  if (!authHeaders) {
    response.json({ "x-hasura-role": "anonymous" });
    return;
  } else {
    // Validate the received id_token
    const idToken = extractToken(authHeaders);
    if (!idToken) {
      response.json({ "x-hasura-role": "anonymous" });
      return;
    }
    console.log(idToken);
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        var hasuraVariables = {
          "X-Hasura-User-Id": decodedToken.uid,
          "X-Hasura-Role": "user"
        };
        console.log(hasuraVariables); // For debug
        // Send appropriate variables
        response.json(hasuraVariables);
      })
      .catch(e => {
        // Throw authentication error
        console.log(e);
        response.json({ "x-hasura-role": "anonymous" });
      });
  }
});

const extractToken = (bearerToken: string) => {
  const regex = /^(Bearer) (.*)$/g;
  const match = regex.exec(bearerToken);
  if (match && match[2]) {
    return match[2];
  }
  return null;
};
