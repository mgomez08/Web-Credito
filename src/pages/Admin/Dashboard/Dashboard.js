import React from "react";
import Typography from "@material-ui/core/Typography";
import ListAdminMenus from "../../../components/Admin/Dashboard/ListAdminMenus";

const Dashboard = () => {
  return (
    <>
      <Typography variant="h2" align="center" color="initial">
        Bienvenido al Panel de Administración
      </Typography>
      <ListAdminMenus />
    </>
  );
};

export default Dashboard;
