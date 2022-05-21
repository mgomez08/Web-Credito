import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TableBanks from "../../../components/Admin/Banks/TableBanks";
import InputSearchBank from "../../../components/Admin/Banks/InputSearchBanks";
import { AdminContext } from "../../../providers/AdminProvider";
import { getAllBanksApi } from "../../../api/banks";
import { ProgressCircular } from "../../../components/Others/ProgressCircular";
import { EmptyInfo } from "../../../components/Others/EmptyInfo";

const Banks = () => {
  const { banks, setBanks } = useContext(AdminContext);
  useEffect(() => {
    (async () => {
      const response = await getAllBanksApi();
      if (response.ok) {
        setBanks(response.data);
      }
    })();
  }, [setBanks]);
  return (
    <>
      <Typography align="center" variant="h2" color="initial">
        Lista de Bancos
      </Typography>
      <Container component="div" maxWidth="lg">
        {!banks ? (
          <ProgressCircular variantMessage="h4" message="Cargando bancos..." />
        ) : banks.length > 0 ? (
          <>
            <InputSearchBank />
            <TableBanks />
          </>
        ) : (
          <>
            <InputSearchBank />
            <EmptyInfo
              title="No hay registros de bancos aún"
              variantMessage="h4"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Banks;
