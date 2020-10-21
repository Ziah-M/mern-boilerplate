import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/Signup";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default MainRouter;
