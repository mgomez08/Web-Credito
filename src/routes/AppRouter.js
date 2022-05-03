import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LayoutBasic from "../layouts/LayoutBasic";

import Footer from "../components/Web/Footer";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import Error404 from "../pages/Error404";
import useAuth from "../hooks/useAuth";
import { CircularProgress } from "@material-ui/core";

import Profile from "../pages/Profile/Profile";
import Scoring from "../pages/Scoring/Scoring";
import Banks from "../pages/Banks/Banks";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

import { ScrollToTop } from "../utils/ScrollToTop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
  },
}));

export const AppRouter = () => {
  const classes = useStyles();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <CircularProgress
        color="secondary"
        size={100}
        style={{ marginBottom: 200 }}
      />
    );
  } else {
    return (
      <Router>
        <ScrollToTop />
        <div className={classes.root}>
          <LayoutBasic />
          <main className={classes.main}>
            <Switch>
              <PublicRoute
                restricted={false}
                exact
                path="/"
                component={Home}
                isLoggedIn={!!user}
              />
              <PublicRoute
                exact
                path="/login"
                restricted={true}
                component={Login}
                isLoggedIn={!!user}
              />
              <PublicRoute
                exact
                path="/register"
                restricted={true}
                component={Register}
                isLoggedIn={!!user}
              />
              <PrivateRoute
                exact
                path="/perfil"
                component={Profile}
                isLoggedIn={!!user}
              />
              <PrivateRoute
                exact
                path="/user"
                component={Home}
                isLoggedIn={!!user}
              />
              <PrivateRoute
                exact
                path="/calcular-scoring"
                component={Scoring}
                isLoggedIn={!!user}
              />
              <PrivateRoute
                exact
                path="/banks"
                component={Banks}
                isLoggedIn={!!user}
              />
              <PrivateRoute
                exact
                path="/changepassword"
                component={ChangePassword}
                isLoggedIn={!!user}
              />
              <Route component={Error404} />
            </Switch>
          </main>
          <Footer className={classes.footer} />
        </div>
      </Router>
    );
  }
};
