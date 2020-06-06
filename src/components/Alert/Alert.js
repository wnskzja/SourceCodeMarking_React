import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const AlertSnackbar = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Alert = ({ message, type }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertSnackbar onClose={handleClose} severity={type}>
          {message}
        </AlertSnackbar>
      </Snackbar>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
Alert.defaultProps = {
  message: "",
  type: "",
};

export default Alert;
