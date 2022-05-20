import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateBank from "../../components/Admin/Banks/CreateBank";
import EditBank from "../../components/Admin/Banks/EditBank";
import CreateService from "../../components/Admin/Services/CreateService";
import EditService from "../../components/Admin/Services/EditService";
import Banks from "../../pages/Admin/Banks/Banks";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Services from "../../pages/Admin/Services/Services";

export const AdminRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/banks" component={Banks} />
        <Route exact path="/dashboard/banks/create" component={CreateBank} />
        <Route exact path="/dashboard/banks/edit/:id" component={EditBank} />
        <Route exact path="/dashboard/services" component={Services} />
        <Route
          exact
          path="/dashboard/services/create"
          component={CreateService}
        />
        <Route
          exact
          path="/dashboard/services/edit/:id"
          component={EditService}
        />
      </Switch>
    </>
  );
};
