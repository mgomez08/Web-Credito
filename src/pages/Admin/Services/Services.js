import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AdminContext } from "../../../providers/AdminProvider";
import { getServicesApi } from "../../../api/services";
import { ProgressCircular } from "../../../components/Others/ProgressCircular";
import { EmptyInfo } from "../../../components/Others/EmptyInfo";
import InputSearchServices from "../../../components/Admin/Services/InputSearchServices";
import TableServices from "../../../components/Admin/Services/TableServices";

const Services = () => {
  const { services, setServices } = useContext(AdminContext);
  useEffect(() => {
    (async () => {
      const response = await getServicesApi();
      if (response.ok) {
        setServices(response.data);
      }
    })();
  }, [setServices]);
  return (
    <>
      <Typography align="center" variant="h2" color="initial">
        Lista de Services
      </Typography>
      <Container component="div" maxWidth="lg">
        {!services ? (
          <ProgressCircular
            variantMessage="h4"
            message="Cargando servicios..."
          />
        ) : services.length > 0 ? (
          <>
            <InputSearchServices />
            <TableServices />
          </>
        ) : (
          <>
            <InputSearchServices />
            <EmptyInfo
              title="No hay registros de servicios aún"
              variantMessage="h4"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Services;
