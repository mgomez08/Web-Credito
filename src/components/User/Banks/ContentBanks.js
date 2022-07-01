import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getBankServicesApi } from "../../../api/user";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { EmptyInfo } from "../../Others/EmptyInfo";

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

export const ContentBanks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await getBankServicesApi();
      setData(response.data);
      setLoading(false);
    })();
  }, []);

  const classes = useStyles();
  if (loading)
    return (
      <ProgressCircular variantMessage="h4" message="Cargando bancos..." />
    );
  if (data.length === 0)
    return (
      <EmptyInfo
        title="No hay registros de servicios de bancos aún"
        variantMessage="h4"
      />
    );
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
            <TableCell className={classes.tableHead}>Banco</TableCell>
            <TableCell className={classes.tableHead} align="left">
              Servicio
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Tasa de interés mensual
            </TableCell>
            <TableCell className={classes.tableHead} align="left">
              Tasa de interés anual
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((interest) => {
            return (
              <TableRow className={classes.tableRow} key={interest.id}>
                <TableCell component="th" scope="row">
                  {interest.Bank.name_bank}
                </TableCell>
                <TableCell align="left">
                  {interest.Service.name_service}
                </TableCell>
                <TableCell align="left">{`${interest.tasa_men}%`}</TableCell>
                <TableCell align="left">{`${interest.tasa_anu}%`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
