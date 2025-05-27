import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LayoutsRoute from "./layouts/backend/Layout1";
import Product from "./views/backend/Main/Product";
import Branch_performance from "./views/backend/Main/Branch_performance";
import View_Branch_merchants from "./views/backend/Main/View_Branch_merchants";
import CreateMerchantForm from "./views/backend/Main/create_merchant";
import view_merchant from "./views/backend/Main/view_merchant";
import ProtectedRoute from "./middleware/protected"; // Import ProtectedRoute
import "./assets/scss/backend.scss";
import "./assets/css/custom.css";
import HeaderStyle1 from "./components/partials/backend/HeaderStyle/HeaderStyle1";
import SidebarStyle from "./components/partials/backend/SidebarStyle/SidebarStyle";
import FooterStyle from "./components/partials/backend/FooterStyle/FooterStyle";
import SignIn from "./views/backend/User/Auth/SignIn";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Route for Sign-in */}
          <Route path="/auth/sign-in" component={SignIn} />

          <div className="wrapper">
            <HeaderStyle1 />
            <SidebarStyle />
            <div className="content-page">
              {/* Protected Routes */}
              <ProtectedRoute path="/Layout1" component={LayoutsRoute} />
              <ProtectedRoute path="/Product" component={Product} />
              <ProtectedRoute
                path="/create_merchant"
                component={CreateMerchantForm}
              />
              <ProtectedRoute path="/view_merchant" component={view_merchant} />
              <ProtectedRoute
                path="/View_Branch_merchants"
                component={View_Branch_merchants}
              />
              <ProtectedRoute
                path="/Branch_performance"
                component={Branch_performance}
              />

              {/* Redirect root path to sign-in if not authenticated */}
              <Route exact path="/">
                <Redirect to="/auth/sign-in" />
              </Route>
            </div>
            <FooterStyle />
          </div>
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
