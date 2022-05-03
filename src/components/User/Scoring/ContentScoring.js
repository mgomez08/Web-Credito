import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  calculateScoringApi,
  getFormProgressApi,
  getScoringInfoApi,
  saveScoringInfoApi,
} from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { FormScoring } from "./FormScoring";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  snackbar: {
    backgroundColor: theme.palette.error.dark,
  },
  button: {
    marginTop: theme.spacing(3),
  },
  scoring: {
    marginTop: theme.spacing(2),
  },
  containerSnackbar: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(6),
  },
  snackbarGreen: {
    backgroundColor: theme.palette.success.dark,
  },
  snackbarBlue: {
    backgroundColor: theme.palette.secondary.dark,
  },
  snackbarRed: {
    backgroundColor: theme.palette.error.dark,
  },
  textGreen: {
    color: theme.palette.success.main,
  },
  textBlue: {
    color: theme.palette.secondary.main,
  },
  textRed: {
    color: theme.palette.error.main,
  },
}));

export default function ContentScoring() {
  const [showAlert, setShowAlert] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const [showScoring, setShowScoring] = useState(false);
  const [valueScoring, setValueScoring] = useState();
  const [scoringForm, setScoringForm] = useState(null);

  useEffect(() => {
    const fetchScoringData = async () => {
      const result = await getScoringInfoApi(getAccessTokenApi());
      if (result.data.scoring !== null) {
        setValueScoring(result.data.scoring);
        setShowScoring(true);
      }
      setScoringForm(result.data);
    };
    fetchScoringData();
  }, []);

  const onSubmitScoring = async (data, e) => {
    e.preventDefault();
    setValueScoring("");
    setShowScoring(false);
    setShowButton(false);
    const token = await getAccessTokenApi();
    const resultProgress = await getFormProgressApi(token);
    if (resultProgress.data.progress !== 100) {
      setShowAlert(true);
      setShowButton(true);
    } else {
      setShowCircularProgress(true);
      if (scoringForm.havecredits === "No") {
        scoringForm.amountcreditacquired = null;
        scoringForm.dayspastdue = null;
      }
      const result = await saveScoringInfoApi(scoringForm, token);
      if (!result.ok) {
        setShowCircularProgress(false);
        setValueScoring(result.message);
        setShowScoring(true);
        setShowButton(true);
      } else {
        const result = await calculateScoringApi(getAccessTokenApi());
        if (result.ok) {
          setShowCircularProgress(false);
          setValueScoring(result.data);
          setShowScoring(true);
          setShowButton(true);
        } else {
          setShowCircularProgress(false);
          setValueScoring(result.msg);
          setShowScoring(true);
          setShowButton(true);
        }
      }
    }
  };

  const classes = useStyles();
  return !scoringForm ? (
    <ProgressCircular
      variantMessage="h4"
      message="Cargando su información, por favor espere un momento"
    />
  ) : (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography color="initial" align="justify" variant="body1">
        Complete la información de los campos y oprime el botón "calcular.
        scoring"
      </Typography>
      <FormScoring
        scoringForm={scoringForm}
        setScoringForm={setScoringForm}
        onSubmitScoring={onSubmitScoring}
        showButton={showButton}
      />
      {showAlert ? (
        <div className={classes.root}>
          <SnackbarContent
            action={
              <Link
                to="/perfil"
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
              >
                Ir al perfil
              </Link>
            }
            className={classes.snackbar}
            message={
              "No ha completado toda su información, ingrese a su perfil para completarla."
            }
          />
        </div>
      ) : (
        ""
      )}
      {showCircularProgress ? (
        <ProgressCircular
          variantMessage="h4"
          message="Calculando su Scoring, esto puede tardar unos segundos"
        />
      ) : (
        ""
      )}
      {showScoring ? (
        <>
          <Typography
            color="initial"
            align="justify"
            variant="h5"
            className={classes.scoring}
          >
            Su scoring tiene un valor de:{" "}
            <span
              className={
                valueScoring > 69
                  ? classes.textGreen
                  : valueScoring > 39
                  ? classes.textBlue
                  : classes.textRed
              }
            >{` ${valueScoring}`}</span>
          </Typography>

          <div className={classes.containerSnackbar}>
            <Typography
              color="initial"
              align="center"
              variant="h5"
              className={classes.scoring}
            >
              ¿Cómo interpretar su resultado?
            </Typography>
            <SnackbarContent
              className={classes.snackbarGreen}
              message={
                "Si su puntuje está en el intervalo de 70-100, la probabilidad de que una entidad financiera apruebe su crédito es alta."
              }
            />
            <SnackbarContent
              className={classes.snackbarBlue}
              message={
                "Si su puntuje está en el intervalo de 40-69, la probabilidad de que una entidad financiera apruebe su crédito es media"
              }
            />
            <SnackbarContent
              className={classes.snackbarRed}
              message={
                "Si su puntuje está en el intervalo de 0-39, la probabilidad de que una entidad financiera apruebe su crédito es baja."
              }
            />
          </div>
        </>
      ) : (
        ""
      )}
    </Grid>
  );
}
