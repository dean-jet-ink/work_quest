import { memo } from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Signup } from "../components/pages/Signup";
import { AuthProvider } from "../providers/AuthProvider";
import { LoginUserProvider } from "../providers/LoginUserContext";
import { PrivateRoute } from "./PrivateRoute";
import { topRoutes } from "./topRoutes";

export const Router = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route
          path="/top"
          render={({ match: { url } }) => (
            <AuthProvider>
              <Switch>
                {topRoutes.map((route) => (
                  <PrivateRoute
                    key={route.key}
                    exact={route.exact}
                    path={`${url}${route.path}`}
                    component={route.component}
                  />
                ))}
              </Switch>
            </AuthProvider>
          )}
        />
      </LoginUserProvider>
    </Switch>
  );
});
