import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import FormBanks from "./FormBanks";
import { getBankApi } from "../../../api/banks";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { useParams } from "react-router-dom";
import { getAccessTokenApi } from "../../../api/auth";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const EditBank = () => {
  const [bank, setBank] = useState();
  const [redirectToList, setRedirectToList] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await getBankApi(id, getAccessTokenApi());
      if (response.ok) {
        setBank(response.data);
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
  if (redirectToList) return <Redirect to="/dashboard/banks" />;
  return (
    <Container maxWidth="sm">
      {!bank ? (
        <ProgressCircular variantMessage="h4" message="Cargando banco..." />
      ) : (
        <>
          <Typography align="center" variant="h2" color="initial">
            Editar un banco
          </Typography>
          <FormBanks mode="edit" bank={bank} />
        </>
      )}
    </Container>
  );
};

export default EditBank;
