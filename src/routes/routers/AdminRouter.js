import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateBank from "../../components/Admin/Banks/CreateBank";
import EditBank from "../../components/Admin/Banks/EditBank";
import Banks from "../../pages/Admin/Banks/Banks";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";

export const AdminRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/banks" component={Banks} />
        <Route exact path="/dashboard/banks/create" component={CreateBank} />
        <Route exact path="/dashboard/banks/edit/:id" component={EditBank} />
      </Switch>
    </>
  );
};
