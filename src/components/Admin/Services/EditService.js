import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import FormServices from "./FormServices";
import { getServiceApi } from "../../../api/services";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const EditService = () => {
  const [service, setService] = useState();
  const [redirectToList, setRedirectToList] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await getServiceApi(id);
      if (response.ok) {
        setService(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        setRedirectToList(true);
      }
    })();
  }, [id]);
  if (redirectToList) return <Redirect to="/dashboard/services" />;
  return (
    <Container maxWidth="sm">
      {!service ? (
        <ProgressCircular variantMessage="h4" message="Cargando banco..." />
      ) : (
        <>
          <Typography align="center" variant="h2" color="initial">
            Editar un Service
          </Typography>
          <FormServices mode="edit" service={service} />
        </>
      )}
    </Container>
  );
};

export default EditService;
