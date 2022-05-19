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
import { deleteBankApi } from "../../../api/banks";

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

const TableBanks = () => {
  const classes = useStyles();
  const { banks, setBanks, tmp, setTmp } = useContext(AdminContext);

  const handleDelete = async (data) => {
    const result = await Swal.fire({
      title: `¿Está seguro de borrar el banco ${data?.name_bank}?`,
      text: "No se puede revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar esto",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      const response = await deleteBankApi(data.id);
      if (response.ok) {
        Swal.fire(response.msg, "", "success");
        setBanks(banks.filter((bank) => bank.id !== data.id));
        setTmp(tmp.filter((bank) => bank.id !== data.id));
      }
    }
  };
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table
        stickyHeader
        size="small"
        className={classes.table}
        aria-label="Tabla de Categorías"
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID Categoría</TableCell>
            <TableCell className={classes.tableHead} align="left">
              Nombre
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
          {banks.map((bank) => (
            <TableRow className={classes.tableRow} key={bank.id}>
              <TableCell component="th" scope="row">
                {bank.id}
              </TableCell>
              <TableCell align="left">{bank.name_bank}</TableCell>
              <TableCell align="left">
                <Link
                  className={classes.link}
                  to={`/dashboard/banks/edit/${bank.id}`}
                >
                  <Button variant="contained" color="secondary">
                    Editar
                  </Button>
                </Link>
              </TableCell>
              <TableCell align="left">
                <Button
                  onClick={() => handleDelete(bank)}
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

export default TableBanks;
