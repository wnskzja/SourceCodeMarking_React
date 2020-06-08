import React, { useState } from "react";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
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
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState(ALERT_TYPE.SUCCESS);
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
          Đăng kí
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "STUDENT",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Tối đa 15 kí tự")
              .required("Vui lòng không bỏ trống"),
            lastName: Yup.string()
              .max(20, "Tối đa 20 kí tự")
              .required("Vui lòng không bỏ trống"),
            password: Yup.string()
              .min(6, "Ít nhất 6 kí tự")
              .required("Vui lòng không bỏ trống"),
            email: Yup.string()
              .email("Không đúng cấu trúc email")
              .required("Vui lòng không bỏ trống"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const name = values.firstName + " " + values.lastName;
            const email = values.email;
            const password = values.password;
            const role = values.role;
            const data = {
              name: name,
              email: email,
              password: password,
              role: role,
            };
            const header = {
              "Content-Type": "application/json",
            };
            setMessage("");
            axios
              .post("users/signup", data, {
                headers: header,
              })
              .then((response) => {
                setSubmitting(false);
                setSubmitError(false);
                setMessage("Bạn hãy vào email để xác thực tài khoản!");
                setTypeAlert(ALERT_TYPE.SUCCESS);
                setTimeout(() => history.push("/"), 2000);
              })
              .catch((error) => {
                console.log("SignUp -> error", error.response);
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
                    fullWidth
                    id="firstName"
                    label="Họ"
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
                    fullWidth
                    id="lastName"
                    label="Tên"
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
                    fullWidth
                    label="Email"
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
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    error={Boolean(errors.password && touched.password)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Loại tài khoản
                  </InputLabel>
                  <Field
                    as={Select}
                    id="role"
                    name="role"
                    label="role"
                    defaultValue="STUDENT"
                    className="select-role-sign-up"
                  >
                    <MenuItem value={"STUDENT"}>Học Viên</MenuItem>
                    <MenuItem value={"TEACHER"}>Giáo Viên</MenuItem>
                  </Field>
                </Grid>
              </Grid>
              {submitError ? (
                <div className="ErrorForm">Tài khoản đã tồn tại</div>
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
                Đăng kí
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Bạn đã có tài khoản? Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>

      <div className="wrap-alert-confirm">
        <Alert message={message} type={typeAlert} />
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default withAxios(SignUp);
