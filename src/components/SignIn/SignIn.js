import React, { useState, useEffect } from "react";
import DialogChooseRole from "./DialogChooseRole/DialogChooseRole";
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
  const { from } = props.location.state ? props.location.state : "";
  const classes = useStyles();
  const { axios } = props;
  const [submitError, setSubmitError] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [dataResponseService, setDataResponseService] = useState({});
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "STUDENT") {
        history.push("/student");
      } else if (user.role === "TEACHER") {
        history.push("/teacher");
      } else {
        history.push("/admin");
      }
    }
  }, [history]);

  const handleIsisgnIn = ({ isSignIn }) => {
    setIsSignIn(isSignIn);
  };

  const responseGoogle = (response) => {
    const { profileObj } = response;
    const { email } = profileObj;
    const data = {
      email: email,
      fullname: profileObj.name,
      role: "",
      service: "GOOGLE",
    };
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .post("/users/signin", data, {
        headers: header,
      })
      .then((response) => {
        if (response?.data?.role) {
          localStorage.setItem("user", JSON.stringify(response?.data));
          localStorage.setItem("token", response?.headers["access-token"]);
          if (from) {
            history.push(from.pathname);
          } else {
            if (response?.data.role === "STUDENT") {
              history.push("/student");
            } else if (response?.data.role === "TEACHER") {
              history.push("/teacher");
            }
          }
        } else {
          setIsSignIn(true);
          setDataResponseService(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const responseFacebook = (response) => {
    const { name, email } = response;
    const data = {
      email: email,
      fullname: name,
      role: "",
      service: "FACEBOOK",
    };
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post("/users/signin", data, {
        headers: header,
      })
      .then((response) => {
        console.log("responseFacebook -> response", response);
        if (response?.data?.role) {
          localStorage.setItem("user", JSON.stringify(response?.data));
          localStorage.setItem("token", response?.headers["access-token"]);
          if (from) {
            history.push(from.pathname);
          } else {
            if (response?.data.role === "STUDENT") {
              history.push("/student");
            } else if (response?.data.role === "TEACHER") {
              history.push("/teacher");
            }
          }
        } else {
          setIsSignIn(true);
          setDataResponseService(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
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
            Đăng nhập
          </Typography>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, "Ít nhất 6 kí tự")
                .required("Vui lòng không bỏ trống"),
              email: Yup.string()
                .email("Không đúng cấu trúc email")
                .required("Vui lòng không bỏ trống"),
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
                  localStorage.setItem("user", JSON.stringify(response?.data));
                  localStorage.setItem(
                    "token",
                    response?.headers["access-token"]
                  );
                  setSubmitting(false);
                  setSubmitError(false);
                  if (from) {
                    history.push(from);
                  } else {
                    if (response?.data.role === "STUDENT") {
                      history.push("/student");
                    } else if (response?.data.role === "TEACHER") {
                      history.push("/teacher");
                    } else {
                      history.push("/admin");
                    }
                  }
                })
                .catch((error) => {
                  if (
                    error.response.data.error ===
                    "code=401, message=Invalid email or password."
                  ) {
                    setSubmitError("Email hoặc mật khẩu không đúng!");
                  } else {
                    setSubmitError("Tài khoản chưa được xác thực!");
                  }
                  setSubmitting(false);
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
                  label="Email"
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
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                  error={Boolean(touched.password && errors.password)}
                />
                {submitError ? (
                  <div className="ErrorForm">{submitError}</div>
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
                  Đăng nhập
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link to="/resetpassword" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                Bạn không có tài khoản? Đăng kí
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <GoogleLogin
              className="btn-google-login"
              buttonText="ĐĂNG NHẬP VỚI GOOGLE"
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
                callback={responseFacebook}
              />
            </div>
            <div>
              <DialogChooseRole
                isSignIn={isSignIn}
                dataResponseService={dataResponseService}
                handleIsisgnIn={handleIsisgnIn}
                from={from}
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
