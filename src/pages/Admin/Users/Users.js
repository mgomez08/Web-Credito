import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AdminContext } from "../../../providers/AdminProvider";
import { ProgressCircular } from "../../../components/Others/ProgressCircular";
import { EmptyInfo } from "../../../components/Others/EmptyInfo";
import InputSearchUsers from "../../../components/Admin/Users/InputSearchUsers";
import TableUsers from "../../../components/Admin/Users/TableUsers";
import { getAllUsersApi } from "../../../api/admin";

const Users = () => {
  const { users, setUsers } = useContext(AdminContext);
  useEffect(() => {
    (async () => {
      const response = await getAllUsersApi();
      if (response.ok) {
        setUsers(response.data);
      }
    })();
  }, [setUsers]);
  return (
    <>
      <Typography align="center" variant="h2" color="initial">
        Lista de usuarios
      </Typography>
      <Container component="div" maxWidth="lg">
        {!users ? (
          <ProgressCircular
            variantMessage="h4"
            message="Cargando usuarios..."
          />
        ) : users.length > 0 ? (
          <>
            <InputSearchUsers />
            <TableUsers />
          </>
        ) : (
          <>
            <InputSearchUsers />
            <EmptyInfo
              title="No hay registros de usuarios aún"
              variantMessage="h4"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Users;
