import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/users" component={Users} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default MainRouter;
