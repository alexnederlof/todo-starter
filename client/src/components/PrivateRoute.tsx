import React, { ComponentType } from "react";
import { Route, Redirect, RouteProps } from "react-router";
import { oauth2Client } from "../utils/oauth2Client";

interface Props extends RouteProps {
  component: ComponentType<RouteProps>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={props =>
        oauth2Client.credentials.id_token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
