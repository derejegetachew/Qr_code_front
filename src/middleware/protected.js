import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if token exists

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // Render component if authenticated
        ) : (
          <Redirect to="/auth/sign-in" /> // Redirect if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
