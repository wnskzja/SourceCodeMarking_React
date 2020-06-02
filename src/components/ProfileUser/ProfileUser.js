import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import Profile from "../Profile/Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const ProfileUser = ({ axios }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navigation />
      <Profile />
    </div>
  );
};
export default ProfileUser;
