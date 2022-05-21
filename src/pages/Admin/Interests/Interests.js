import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AdminContext } from "../../../providers/AdminProvider";
import { getAllInterestsApi } from "../../../api/interests";
import { ProgressCircular } from "../../../components/Others/ProgressCircular";
import { EmptyInfo } from "../../../components/Others/EmptyInfo";
import InputSearchInterests from "../../../components/Admin/Interests/InputSearchInterests";
import TableInterests from "../../../components/Admin/Interests/TableInterests";

const Interests = () => {
  const { interests, setInterests } = useContext(AdminContext);
  useEffect(() => {
    (async () => {
      const response = await getAllInterestsApi();
      if (response.ok) {
        setInterests(response.data);
      }
    })();
  }, [setInterests]);
  return (
    <>
      <Typography align="center" variant="h2" color="initial">
        Lista de Tasas de Interés
      </Typography>
      <Container component="div" maxWidth="lg">
        {!interests ? (
          <ProgressCircular
            variantMessage="h4"
            message="Cargando tasas de interés..."
          />
        ) : interests.length > 0 ? (
          <>
            <InputSearchInterests />
            <TableInterests />
          </>
        ) : (
          <>
            <InputSearchInterests />
            <EmptyInfo
              title="No hay registros de tasas de interés aún"
              variantMessage="h4"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Interests;
