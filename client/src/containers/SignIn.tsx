import React, { useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
import { oauth2Client } from "../utils/oauth2Client";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

const setToken = async (history: any, code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  history.push("/");
};

export default function SignIn() {
  const classes = useStyles();
  const { history } = useReactRouter();
  // If history changes re-direct to /
  useEffect(() => {
    const params = new URLSearchParams(document.location.search.substring(1));
    let code = params.get("code");
    if (code) {
      setToken(history, code);
    }
  }, [history]);
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["email", "profile"];

  const url = oauth2Client.generateAuthUrl({
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  return (
    <div className={classes.root}>
      <Button href={url} variant="contained">
        Sign in with Google
      </Button>
    </div>
  );
}
