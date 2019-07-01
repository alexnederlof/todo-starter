import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError
} from "apollo-server-express";
import program from "commander";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";
import express from "express";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { sequelize } from "./models";

program.option("-s, --sync-db", "Sync database").parse(process.argv);

const client = new OAuth2Client(process.env.OAUTH2_CLIENT_ID);

const origin = "http://localhost:3000";

const host = "http://localhost:4000";

const run = () => {
  if (program.syncDb) {
    sequelize.sync({ force: true });
  } else {
    const app = express();
    const corsOptions = {
      origin,
      credentials: true // <-- REQUIRED backend setting
    };
    app.use(cors(corsOptions));

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        // Uncomment to skip authentication and authorization if in development and in the
        // GraphQL Playground
        // if (
        //   process.env.NODE_ENV !== "production" &&
        //   req.headers.referer === "http://localhost:4000/graphql"
        // ) {
        //   return;
        // }

        // Get the user token from the headers
        const token = req.headers.authorization || "";
        if (!token || !process.env.OAUTH2_CLIENT_ID) {
          throw new AuthenticationError("must authenticate");
        }
        const ticket = await client.verifyIdToken({
          idToken: token.substr("Bearer ".length),
          audience: process.env.OAUTH2_CLIENT_ID
        });
        const uid = ticket.getUserId();
        if (!uid) {
          throw new ForbiddenError("not authorized");
        }
        return { user: { uid } };
      }
    });
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀  Server ready at ${host}${server.graphqlPath}`);
    });
  }
};

run();
