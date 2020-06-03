import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { withAxios } from "../../axios/index";
import "./SignIn.scss";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" color="inherit">
        Source code Marking
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SignIn = (props) => {
  const { from } = props.location.state || { from: { pathname: "/student" } };
  const classes = useStyles();
  const { axios } = props;
  const [submitError, setSubmitError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "STUDENT") {
        history.push("/student");
      } else if (user.role === "TEACHER") {
        history.push("/teacher");
      }
    }
    console.log(`${process.env.REACT_APP_CLIENT_ID_GOOGLE}`);
  }, [history]);

  const responseGoogle = (response) => {
    console.log(response);
  };

  const componentClickedFacebook = () => {
    console.log("Button Facebook login clicked");
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, "At least 6 characters")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const data = {
                email: values.email,
                password: values.password,
                service: "EMAIL",
              };
              const header = {
                "Content-Type": "application/json",
              };
              axios
                .post("/users/signin", data, {
                  headers: header,
                })
                .then((response) => {
                  console.log("SignIn -> response", response);
                  localStorage.setItem("user", JSON.stringify(response?.data));
                  localStorage.setItem(
                    "token",
                    response?.headers["access-token"]
                  );
                  setSubmitting(false);
                  setSubmitError(false);
                  history.push(from);
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
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={touched.email && errors.email ? errors.email : ""}
                  error={Boolean(touched.email && errors.email)}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                  error={Boolean(touched.password && errors.password)}
                />
                {submitError ? (
                  <div className="ErrorForm">
                    You enter wrong email or password
                  </div>
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
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <GoogleLogin
              className="btn-google-login"
              buttonText="SIGN IN  WITH GOOGLE"
              clientId={`${process.env.REACT_APP_CLIENT_ID_GOOGLE}`}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <div className="wrap-btn-facebook-login">
              <FacebookLogin
                className="btn-facebook-login"
                appId={`${process.env.REACT_APP_ID_APP_FACEBOOK}`}
                fields="name,email,picture"
                onClick={componentClickedFacebook}
                callback={responseFacebook}
              />
            </div>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
export default withAxios(SignIn);
