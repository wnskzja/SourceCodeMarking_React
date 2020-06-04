import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withAxios } from "../../axios/index";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const VerifyEmail = ({ axios }) => {
  const classes = useStyles();
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`/users/confirmation?confirmation_token=${token}`)
      .then((response) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, token]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <div className={classes.wrapper}>
          <Fab color="primary" className={buttonClassname}>
            {success ? <CheckIcon /> : <CloseIcon />}
          </Fab>
          {loading ? (
            <CircularProgress size={68} className={classes.fabProgress} />
          ) : null}
        </div>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={() => {
              history.push("/");
            }}
          >
            {success ? "Về trang chủ" : "Đang xác nhận ..."}
          </Button>
        </div>
      </Backdrop>
    </div>
  );
};
export default withAxios(VerifyEmail);
