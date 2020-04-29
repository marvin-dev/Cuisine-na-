import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validate from "validate.js";
import { useStyles } from "./signinSignupStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import LinearLoader from "../loader/linearLoader";
import PropTypes from "prop-types";
import Axios from "axios";

function Signin(props) {
  const { history } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    status: "",
    text: null
  });
  const [validateForm, setValidate] = useState({
    isValide: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(validateForm.values, {
      username: {
        presence: { allowEmpty: false, message: "is required" }
      },
      password: {
        presence: { allowEmpty: false, message: "is required" }
      }
    });
    setValidate(validateForm => ({
      ...validateForm,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [validateForm.values]);

  const handleChange = e => {
    e.persist();
    setValidate(validateForm => ({
      ...validateForm,
      values: {
        ...validateForm.values,
        [e.target.name]: e.target.value
      },
      touched: {
        ...validateForm.touched,
        [e.target.name]: true
      }
    }));
  };

  const hasError = field =>
    validateForm.touched[field] && validateForm.errors[field] ? true : false;

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    Axios({
      method: "POST",
      url: `/token-auth/`,
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        username: validateForm.values["username"],
        password: validateForm.values["password"]
      })
    })
      .then(res => {
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("token", res.data.token);
          history.push("/home");
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "error",
            text: "Invalid username or password."
          });
        }, 1000);
      });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({
      ...alert,
      open: false
    });
  };
  return (
    <React.Fragment>
      {/* Loader */}
      <LinearLoader loading={loading} />
      {/* End Loader */}
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={6} md={8} className={classes.image} />
        <Grid item xs={12} sm={6} md={4} className={classes.wrapper}>
          <div className={classes.paper}>
            <Grid item>
              <Link
                to="/home"
                variant="body2"
                style={{ textDecoration: "none", color: "#eb4a36" }}
              >
                <Typography
                  variant="subtitle2"
                  style={{ fontSize: "17px", marginBottom: "15px" }}
                >
                  Cuisine-na
                </Typography>
              </Link>
            </Grid>
            <Typography component="h1" variant="h5">
              Login to continue
            </Typography>
            <form onSubmit={handleLogin} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                InputLabelProps={{ required: false }}
                value={validateForm.values.username || ""}
                error={hasError("username")}
                helperText={
                  hasError("username") ? validateForm.errors.username[0] : ""
                }
              />
              <TextField
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ required: false }}
                value={validateForm.values.password || ""}
                error={hasError("password")}
                helperText={
                  hasError("password") ? validateForm.errors.password[0] : ""
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!validateForm.isValid || loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item style={{ marginBottom: "10px" }}>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      {/* Snackbar for login of recipe */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.status}>
          {alert.text}
        </Alert>
      </Snackbar>
      {/* End Snackbar for login of recipe */}
    </React.Fragment>
  );
}

export default Signin;

Signin.propTypes = {
  history: PropTypes.object
};
