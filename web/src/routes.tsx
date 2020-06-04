import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import CreateCollectCenter from "./pages/CreateCollectCenter";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreateCollectCenter} path="/create-center" />
    </BrowserRouter>
  );
};

export default Routes;
