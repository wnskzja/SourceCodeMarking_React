import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { withAxios } from "../../axios/index";
import "./SignUp.scss";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Source code Marking
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const { axios } = props;
  const [submitError, setSubmitError] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.text}>
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required *"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required *"),
            password: Yup.string()
              .min(6, "At least 6 charaters")
              .required("Required *"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required *"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const name = values.firstName + " " + values.lastName;
            const email = values.email;
            const password = values.password;
            const data = {
              name: name,
              email: email,
              password: password,
              role: "STUDENT",
            };
            const header = {
              "Content-Type": "application/json",
            };
            axios
              .post("users/signup", data, {
                headers: header,
              })
              .then((response) => {
                setSubmitting(false);
                setSubmitError(false);
                history.push("/");
              })
              .catch((error) => {
                setSubmitting(false);
                setSubmitError(true);
              })
              .finally(() => {});
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                    error={Boolean(errors.firstName && touched.firstName)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={
                      errors.lastName && touched.lastName ? errors.lastName : ""
                    }
                    error={Boolean(errors.lastName && touched.lastName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    name="email"
                    type="email"
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    error={Boolean(errors.email && touched.email)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    error={Boolean(errors.password && touched.password)}
                  />
                </Grid>
              </Grid>
              {submitError ? (
                <div className="ErrorForm">This account already existed</div>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default withAxios(SignUp);
