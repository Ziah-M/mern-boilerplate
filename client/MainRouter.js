import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import SignUp from "./user/Signup";
import Users from "./user/Users";
import SignIn from "./auth/SignIn";
import Profile from "./user/Profile";

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default MainRouter;
