import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";

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
  return (
    <div className={classes.root}>
      <Navigation hidden={false} />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Home />
      </div>
    </div>
  );
};
export default Mark;
