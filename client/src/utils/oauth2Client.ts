import { google } from "googleapis";

const redirectUrl = "http://localhost:3000";

export const oauth2Client = new google.auth.OAuth2(
  process.env.REACT_APP_OAUTH2_CLIENT_ID,
  process.env.REACT_APP_OAUTH2_CLIENT_SECRET,
  redirectUrl
);

oauth2Client.on("tokens", tokens => {
  oauth2Client.setCredentials(tokens);
});
