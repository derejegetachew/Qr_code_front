// LayoutsRoute.js
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to get state from Redux
import Layout1 from "../layouts/backend/Layout1";
import BlankLayout from "../layouts/BlankLayout";
import ProtectedRoute from "../middleware/protected";

const LayoutsRoute = () => {
  // Access the 'isAuthenticated' value from the Redux state
  const isAuthenticated = useSelector((state) => {
    console.log("Redux state:", state.auth); // Log the whole auth state
    return state.auth ? state.auth.isAuthenticated : false; // Safely get isAuthenticated from the auth state
  });

  console.log("isAuthenticated:", isAuthenticated); // Log the value of isAuthenticated

  return (
    <Switch>
      {/* Route for authentication related pages */}
      <Route path="/auth" component={BlankLayout} />

      {/* Main route where access is protected */}
      <Route
        path="/"
        render={() =>
          isAuthenticated ? (
            // If user is authenticated, render the protected route
            <ProtectedRoute
              path="/"
              component={Layout1}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            // If not authenticated, redirect to sign-in page
            <Redirect to="/auth/sign-in" />
          )
        }
      />
    </Switch>
  );
};

export default LayoutsRoute;
