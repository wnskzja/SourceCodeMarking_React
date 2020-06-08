import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import ListFile from "../ListFile/ListFile";
import { withAxios } from "../../axios/index";
import { useParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const TeacherExercise = ({ axios }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .get(`/exercises/${id}`, {
        headers: header,
      })
      .then((response) => {
        setDescription(response.data.description);
        setName(response.data.name);
        setDeadline(response.data.deadline);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, message]);

  const updateDes = (newDes) => {
    axios
      .put(`/exercises/${id}`, {
        name: name,
        description: newDes,
        deadline: deadline,
      })
      .then((response) => {
        setMessage("");
        setMessage("Cập nhật thành công");
        setTypeAlert(ALERT_TYPE.SUCCESS);
      })
      .catch((error) => {
        console.error(error);
        setMessage("");
        setMessage("Cập nhật thất bại");
        setTypeAlert(ALERT_TYPE.ERROR);
      })
      .finally(() => {});
  };

  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <ListFile
        nameEx={name}
        deadlineEx={deadline}
        descriptionEx={description}
        updateDes={(newDes) => {
          updateDes(newDes);
        }}
      />
      <Alert message={message} type={typeAlert} />
    </div>
  );
};
export default withAxios(TeacherExercise);
