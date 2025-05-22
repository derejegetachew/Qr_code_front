import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Dashbord from "../views/backend/Main/Dashbord";
import Product from "../views/backend/Main/Product";
import viewAllMerchant from "../views/backend/Main/viewAllMerchant";
import Productadd from "../views/backend/Main/Productadd";
import View_Branch_merchants from "../views/backend/Main/View_Branch_merchants";
import Branch_performance from "../views/backend/Main/Branch_performance";
import CreateMerchantForm from "../views/backend/Main/create_merchant";

const Layout1Route = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Switch location={location}>
          {/* Main routes */}
          <Route path="/" exact component={Dashbord} />
          <Route path="/product" component={Product} />
          <Route path="/viewAllMerchant" component={viewAllMerchant} />
          <Route
            path="/View_Branch_merchants"
            component={View_Branch_merchants}
          />
          <Route path="/Branch_performance" component={Branch_performance} />
          <Route path="/product-add" component={Productadd} />
          <Route path="/create_merchant" component={CreateMerchantForm} />

          {/* Redirect to dashboard if the route is not found */}
          <Redirect to="/" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Layout1Route;
