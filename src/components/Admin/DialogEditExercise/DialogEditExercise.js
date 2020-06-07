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
  const { exercise, open, handleEditExercise, axios } = props;
  const [exercisename, setExerciseName] = useState(exercise?.name);
  const [description, setDescription] = useState(exercise?.description);
  const [deadline, setDeadline] = useState(exercise?.deadline);

  const handleCancelDialog = () => {
    handleEditExercise({ exercise: "" });
  };

  const handleEditExerciseName = (e) => {
    setExerciseName(e.target.value);
  };

  const handleEditDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitEditUser = () => {
    const header = {
      "Content-Type": "application/json",
    };
    const data = {
      name: exercisename ? exercisename : exercise?.name,
      description: description ? description : exercise?.description,
      deadline: deadline ? deadline : exercise?.deadline,
    };

    axios
      .put(`/exercises/${exercise.id}`, data, {
        headers: header,
      })
      .then((response) => {
        handleEditExercise({ exercise: "" });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const getDeadLineFromProp = (exercise) => {
    if (exercise) {
      const today = new Date(exercise?.deadline);
      console.log(exercise?.deadline);
      const string =
        today.toISOString().substr(0, 10) +
        "T" +
        today.toTimeString().substr(0, 5);
      return string;
    }
  };

  const onChangeDeadline = (e) => {
    const { value } = e.target;
    const date = new Date(value).toISOString();
    setDeadline(date);
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Sửa thông tin user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="exercisename"
          label="Tên lớp"
          type="text"
          defaultValue={exercise?.name}
          onChange={handleEditExerciseName}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Mô tả"
          defaultValue={exercise?.description}
          onChange={handleEditDescription}
          fullWidth
        />
        <TextField
          id="datetime-local"
          label="Thời hạn nộp bài"
          type="datetime-local"
          name="dateTime"
          defaultValue={getDeadLineFromProp(exercise)}
          onChange={onChangeDeadline}
          InputLabelProps={{
            shrink: true,
          }}
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

const DialogEditExercise = ({ exercise, handleEditExercise, axios }) => {
  const handleClose = (value) => {};
  return (
    <div>
      <SimpleDialog
        exercise={exercise}
        open={exercise !== "" ? true : false}
        handleEditExercise={handleEditExercise}
        onClose={handleClose}
        axios={axios}
      />
    </div>
  );
};
export default withAxios(DialogEditExercise);
