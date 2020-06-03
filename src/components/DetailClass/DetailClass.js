import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import HomeWork from "../HomeWork/HomeWork";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const DetailClass = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <HomeWork />
    </div>
  );
};
export default DetailClass;
