import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import Home from "./core/Home";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Users from "./user/Users";
import Menu from "./main/Menu";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default MainRouter;
