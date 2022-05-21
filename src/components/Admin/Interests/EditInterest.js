import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import FormInterests from "./FormInterests";
import { getInterestApi } from "../../../api/interests";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const EditInterest = () => {
  const [interest, setInterest] = useState();
  const [redirectToList, setRedirectToList] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await getInterestApi(id);
      if (response.ok) {
        setInterest(response.data);
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
  if (redirectToList) return <Redirect to="/dashboard/interests" />;
  return (
    <Container maxWidth="sm">
      {!interest ? (
        <ProgressCircular
          variantMessage="h4"
          message="Cargando tasas de interés..."
        />
      ) : (
        <>
          <Typography align="center" variant="h2" color="initial">
            Editar una tasa de interés
          </Typography>
          <FormInterests mode="edit" interest={interest} />
        </>
      )}
    </Container>
  );
};

export default EditInterest;
