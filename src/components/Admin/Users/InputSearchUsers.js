import React, { useContext, useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { AdminContext } from "../../../providers/AdminProvider";

const InputSearchUsers = () => {
  const { users, setUsers, tmp, setTmp } = useContext(AdminContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTmp(users);
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ target }) => {
    setInput(target.value);
    if (target.value === "") {
      setUsers(tmp);
    } else {
      setUsers(
        tmp.filter((user) =>
          user.email.toLowerCase().includes(target.value.toLowerCase())
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
        <Grid item xs={12} sm={12}>
          <TextField
            color="primary"
            label="Buscar un usuario por email..."
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
      </Grid>
    </form>
  );
};

export default InputSearchUsers;
