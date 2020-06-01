import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import DetailHomeWork from "../DetailHomeWork/DetaiHomeWork";
import { withAxios } from "../../axios/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const StudentExercise = ({ axios }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [exercise, setExercise] = useState({});
  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .get(`/exercises/${id}`, {
        headers: header,
      })
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id]);
  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <DetailHomeWork exercise={exercise} />
    </div>
  );
};
export default withAxios(StudentExercise);
