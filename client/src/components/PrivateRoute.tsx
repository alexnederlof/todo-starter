import React, { ComponentType } from "react";
import { Route, Redirect, RouteProps } from "react-router";

interface Props extends RouteProps {
  component: ComponentType<RouteProps>;
  token: string | null;
}

export default function PrivateRoute({
  component: Component,
  token,
  ...rest
}: Props) {
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
