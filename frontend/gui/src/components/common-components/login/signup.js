import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validate from "validate.js";
import { useStyles } from "./signinSignupStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import LinearLoader from "../loader/linearLoader";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import axios from "axios";

const experience = [
  {
    value: "Beginner",
    label: "Beginner"
  },
  {
    value: "Advanced",
    label: "Advanced"
  },
  {
    value: "Expert",
    label: "Expert"
  }
];

function Signup(props) {
  const { history } = props;
  const classes = useStyles();
  const [exp, setExperience] = React.useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    status: null
  });
  const [validateForm, setValidate] = useState({
    isValide: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(validateForm.values, {
      name: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
          minimum: 8
        }
      },
      email: {
        presence: { allowEmpty: false, message: "is required" },
        email: true,
        length: {
          maximum: 40
        }
      },
      username: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
          minimum: 5
        }
      },
      password: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
          maximum: 80,
          minimum: 6
        }
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
    if (e.target.name === "experience") {
      setExperience(e.target.value);
    } else {
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
    }
  };

  const hasError = field =>
    validateForm.touched[field] && validateForm.errors[field] ? true : false;

  const handleSignup = e => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "POST",
      url: `/api/account/signup/`,
      data: JSON.stringify({
        name: validateForm.values["name"],
        email: validateForm.values["email"],
        username: validateForm.values["username"],
        password: validateForm.values["password"],
        experience: exp
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "success"
          });
        }, 1500);
        setTimeout(() => {
          localStorage.setItem("token", res.data.token);
          history.push("/home");
        }, 2100);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
          setAlert({
            open: true,
            status: "failed"
          });
        }, 1000);
      });
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
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
            <Typography component="h1" variant="h5">
              Create account
            </Typography>
            <form onSubmit={handleSignup} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    onChange={handleChange}
                    InputLabelProps={{ required: false }}
                    value={validateForm.values.name || ""}
                    error={hasError("name")}
                    helperText={
                      hasError("name") ? validateForm.errors.name[0] : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    InputLabelProps={{ required: false }}
                    error={hasError("email")}
                    helperText={
                      hasError("email") ? validateForm.errors.email[0] : ""
                    }
                    value={validateForm.values.email || " "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    InputLabelProps={{ required: false }}
                    value={validateForm.values.username || ""}
                    error={hasError("username")}
                    helperText={
                      hasError("username")
                        ? validateForm.errors.username[0]
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="experience"
                    select
                    fullWidth
                    label="Experience"
                    name="experience"
                    value={exp}
                    onChange={handleChange}
                    InputLabelProps={{ required: false }}
                    SelectProps={{
                      native: true
                    }}
                    variant="outlined"
                  >
                    {experience.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    InputLabelProps={{ required: false }}
                    value={validateForm.values.password || ""}
                    error={hasError("password")}
                    helperText={
                      hasError("password")
                        ? validateForm.errors.password[0]
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!validateForm.isValid || loading}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
        {/* Snackbar for signup */}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          {alert.status === "success" ? (
            <Alert onClose={handleClose} severity="success">
              Account created successfully.
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              Error creating account.
            </Alert>
          )}
        </Snackbar>
        {/* End Snackbar for signup */}
      </Grid>
    </React.Fragment>
  );
}

export default Signup;

Signup.propTypes = {
  history: PropTypes.object
};
