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
import { deleteInterestApi } from "../../../api/interests";

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

const TableInterests = () => {
  const classes = useStyles();
  const { interests, setInterests, tmp, setTmp } = useContext(AdminContext);

  const handleDelete = async (data) => {
    const result = await Swal.fire({
      title: `¿Está seguro de borrar la tasa de interés del servicio ${data?.Service.name_service} del banco ${data?.Bank.name_bank}?`,
      text: "No se puede revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar esto",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      const response = await deleteInterestApi(data.id);
      if (response.ok) {
        Swal.fire(response.msg, "", "success");
        setInterests(interests.filter((interest) => interest.id !== data.id));
        setTmp(tmp.filter((interest) => interest.id !== data.id));
      }
    }
  };
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table
        stickyHeader
        size="small"
        className={classes.table}
        aria-label="Tabla de Servicios"
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>
              ID Tasa de Interés
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Banco
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Servicio
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Tasa Mensual
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Tasa Anual
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Editar
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Eliminar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interests.map((interest) => (
            <TableRow className={classes.tableRow} key={interest.id}>
              <TableCell component="th" scope="row">
                {interest.id}
              </TableCell>
              <TableCell align="left">{interest.Bank.name_bank}</TableCell>
              <TableCell align="left">
                {interest.Service.name_service}
              </TableCell>
              <TableCell align="left">{`${interest.tasa_men}%`}</TableCell>
              <TableCell align="left">{`${interest.tasa_anu}%`}</TableCell>
              <TableCell align="left">
                <Link
                  className={classes.link}
                  to={`/dashboard/interests/edit/${interest.id}`}
                >
                  <Button variant="contained" color="secondary">
                    Editar
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="left">
                <Button
                  onClick={() => handleDelete(interest)}
                  className={classes.colorDelete}
                  variant="contained"
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableInterests;
