import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import ListFile from "../ListFile/ListFile";
import { withAxios } from "../../axios/index";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const TeacherExercise = ({ axios }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .get(`/exercises/${id}`, {
        headers: header,
      })
      .then((response) => {
        setName(response.data.name);
        setDeadline(response.data.deadline);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id]);

  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <ListFile nameEx={name} deadlineEx={deadline} />
    </div>
  );
};
export default withAxios(TeacherExercise);
