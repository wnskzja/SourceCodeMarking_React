import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withAxios } from "../../../axios/index";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, user, axios, handleEditUser } = props;
  const [fullname, setFullname] = useState("");
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleEditFullName = (e) => {
    setFullname(e.target.value);
  };

  const handleSubmitEditUser = () => {
    const header = {
      "Content-Type": "application/json",
    };
    const data = {
      name: fullname ? fullname : user?.name,
    };

    axios
      .put(`/users/${user.id}`, data, {
        headers: header,
      })
      .then((response) => {
        handleEditUser({ statusEdit: { status: false, user: "" } });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Sửa thông tin user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Họ Tên"
          type="text"
          defaultValue={user?.name}
          onChange={handleEditFullName}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={user?.email}
          disabled={true}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmitEditUser} color="primary">
          Sửa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const DialogEditUser = ({ isEdit, user, axios, handleEditUser }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  useEffect(() => {
    setSelectedValue("");
  }, [isEdit]);

  const handleClose = (value) => {
    handleEditUser({ statusEdit: { status: false, user: "" } });
  };
  return (
    <div>
      <SimpleDialog
        user={user}
        selectedValue={selectedValue}
        open={isEdit ? isEdit : false}
        handleEditUser={handleEditUser}
        onClose={handleClose}
        axios={axios}
      />
    </div>
  );
};
export default withAxios(DialogEditUser);
