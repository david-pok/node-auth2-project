import React, { useState } from "react";
import { TextField, Button, makeStyles, Link } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  formComp: {
    marginTop: 25
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", user)
      .then(res => {
        console.log("login response", res);
        localStorage.setItem("token", res.data.token);
        history.push("/users");
      })
      .catch(err => {
        console.log("login error: ", err);
        window.alert("Incorrect credentials or user does not exist.");
      });
  };

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <form className={classes.container} onSubmit={handleLogin}>
        <TextField
          label="Username"
          name="username"
          required
          onChange={handleChanges}
          className={classes.formComp}
        />
        <TextField
          label="Password"
          name="password"
          required
          type="password"
          onChange={handleChanges}
          className={classes.formComp}
        />
        <Button className={classes.formComp} type="submit">
          Login!
        </Button>
      </form>
      <Link className={classes.formComp} href="/register" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </div>
  );
}
