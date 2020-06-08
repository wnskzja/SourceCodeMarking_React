import React, { useState } from "react";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { withAxios } from "../../axios/index";

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
    justifyContent: "center",
  },
}));

const ResetPassword = (props) => {
  const { axios } = props;
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState(ALERT_TYPE.SUCCESS);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.text}>
          Quên mật khẩu
        </Typography>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required *"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const email = values.email;
            const header = {
              "Content-Type": "application/json",
            };
            setMessage("");
            axios
              .get(`users/password?email=${email}`, {
                headers: header,
              })
              .then((response) => {
                if (response.status === 204) {
                  setSubmitting(false);
                  setMessage("Kiểm tra email của bạn!");
                  setTypeAlert(ALERT_TYPE.SUCCESS);
                  setInterval(function () {
                    history.push("/");
                  }, 2000);
                }
              })
              .catch((error) => {
                setMessage("");
                setMessage("Email không tồn tại");
                setTypeAlert(ALERT_TYPE.WARNING);
                setSubmitting(false);
              })
              .finally(() => {});
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2} className={classes.submit}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>

      <Alert message={message} type={typeAlert} />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default withAxios(ResetPassword);
