import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { numberCurrencyFormat } from "../../../utils/numberFormat";

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
}));

const TableCredit = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table
        stickyHeader
        size="small"
        className={classes.table}
        aria-label="Tabla de Bancos"
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead} align="left">
              Periodo
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Monto
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Cuota
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Interés
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Capital
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Saldo
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow className={classes.tableRow} key={item.due}>
              <TableCell component="th" scope="row">
                {item.due}
              </TableCell>
              <TableCell component="th" scope="row">
                {numberCurrencyFormat(item.amount)}
              </TableCell>
              <TableCell component="th" scope="row">
                {numberCurrencyFormat(item.fee)}
              </TableCell>
              <TableCell component="th" scope="row">
                {numberCurrencyFormat(item.interest)}
              </TableCell>
              <TableCell component="th" scope="row">
                {numberCurrencyFormat(item.capital)}
              </TableCell>
              <TableCell component="th" scope="row">
                {numberCurrencyFormat(item.balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCredit;
