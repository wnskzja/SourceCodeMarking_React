import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    padding: 10,
  },
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
}));
const Mark = () => {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Home idFile={id} />
      </div>
    </div>
  );
};
export default Mark;
