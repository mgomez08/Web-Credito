import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../providers/AdminProvider";

const useStyles = makeStyles((theme) => ({
  colorCreate: {
    backgroundColor: "#4ea93b",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#4ea93b",
      filter: "brightness(0.9)",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const InputSearchServices = () => {
  const classes = useStyles();
  const { services, setServices, tmp, setTmp } = useContext(AdminContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTmp(services);
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ target }) => {
    setInput(target.value);
    if (target.value === "") {
      setServices(tmp);
    } else {
      setServices(
        tmp.filter((service) =>
          service.name_service
            .toLowerCase()
            .includes(target.value.toLowerCase())
        )
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={9}>
          <TextField
            color="primary"
            label="Buscar un servicio..."
            margin="normal"
            name="search"
            onChange={handleChange}
            value={input}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Link className={classes.link} to="/dashboard/services/create">
            <Button
              className={classes.colorCreate}
              variant="contained"
              fullWidth
              endIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default InputSearchServices;
