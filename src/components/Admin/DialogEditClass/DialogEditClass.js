import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withAxios } from "../../../axios/index";

function SimpleDialog(props) {
  const { clas, open, handleEditClass, axios } = props;
  const [classname, setClassname] = useState("");
  const [description, setDescription] = useState("");

  const handleCancelDialog = () => {
    handleEditClass({ clas: "" });
  };

  const handleEditClassName = (e) => {
    setClassname(e.target.value);
  };

  const handleEditDescription = (e) => {
    setDescription(e.target.value);
  };

  const getListTeacher = (teachers) => {
    let listTeacher = "";

    if (teachers) {
      teachers.forEach((teacher, index) => {
        if (index === teachers.length - 1) {
          listTeacher += teacher.name;
        } else {
          listTeacher += `${teacher.name}, `;
        }
      });
    }

    return listTeacher;
  };

  const handleSubmitEditUser = () => {
    const header = {
      "Content-Type": "application/json",
    };
    const data = {
      name: classname ? classname : clas?.name,
      description: description ? description : clas?.description,
    };

    axios
      .put(`/classes/${clas.id}`, data, {
        headers: header,
      })
      .then((response) => {
        handleEditClass({ clas: "" });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sửa thông tin user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="classname"
          label="Tên lớp"
          type="text"
          defaultValue={clas?.name}
          onChange={handleEditClassName}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Mô tả"
          defaultValue={clas?.description}
          onChange={handleEditDescription}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Giáo viên"
          value={getListTeacher(clas?.teachers)}
          disabled={true}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDialog} color="primary">
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
};

const DialogEditClass = ({ clas, handleEditClass, axios }) => {
  const handleClose = (value) => {};
  return (
    <div>
      <SimpleDialog
        clas={clas}
        open={clas !== "" && clas !== undefined ? true : false}
        handleEditClass={handleEditClass}
        onClose={handleClose}
        axios={axios}
      />
    </div>
  );
};
export default withAxios(DialogEditClass);
