import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateBank from "../../components/Admin/Banks/CreateBank";
import EditBank from "../../components/Admin/Banks/EditBank";
import CreateInterest from "../../components/Admin/Interests/CreateInterest";
import EditInterest from "../../components/Admin/Interests/EditInterest";
import CreateService from "../../components/Admin/Services/CreateService";
import EditService from "../../components/Admin/Services/EditService";
import Banks from "../../pages/Admin/Banks/Banks";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import Interests from "../../pages/Admin/Interests/Interests";
import Services from "../../pages/Admin/Services/Services";
import Error404 from "../../pages/Error404";

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
        <Route exact path="/dashboard/interests" component={Interests} />
        <Route
          exact
          path="/dashboard/interests/create"
          component={CreateInterest}
        />
        <Route
          exact
          path="/dashboard/interests/edit/:id"
          component={EditInterest}
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
};
