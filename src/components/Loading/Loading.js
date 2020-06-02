import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} />
      <CircularProgress />
    </div>
  );
};
export default Loading;
