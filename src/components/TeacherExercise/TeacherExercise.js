import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import ListFile from "../ListFile/ListFile";
import { withAxios } from "../../axios/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const StudentExercise = ({ axios }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <ListFile />
    </div>
  );
};
export default withAxios(StudentExercise);
