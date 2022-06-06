import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AdminContext } from "../../../providers/AdminProvider";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SwitchActiveUser from "./SwitchActiveUser";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 400,
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#000",
    color: "#FFF",
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  link: {
    textDecoration: "none",
  },
  colorDelete: {
    backgroundColor: "#FF4040",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#FF4040",
      filter: "brightness(0.9)",
    },
  },
}));

const TableUsers = () => {
  const classes = useStyles();
  const { users, setUsers, tmp, setTmp } = useContext(AdminContext);
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table
        stickyHeader
        size="small"
        className={classes.table}
        aria-label="Tabla de Usuarios"
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID Usuario</TableCell>
            <TableCell className={classes.tableHead} align="left">
              Email
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Estado
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Rol
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow className={classes.tableRow} key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                <SwitchActiveUser active={user.active} id={user.id} />
              </TableCell>
              <TableCell align="left">
                {user.id_rol === 1 ? "Usuario" : "Administrador"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUsers;
