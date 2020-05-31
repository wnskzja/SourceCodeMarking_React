import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Button, Box } from "@material-ui/core";
import { GlobalContext } from "../../ReactContext/ReactContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomeWork = ({ role }) => {
  const classes = useStyles();
  // const role = JSON.parse(localStorage.getItem("user"))?.role;
  const { setTitle } = useContext(GlobalContext);
  const history = useHistory();
  const selectHomeWork = () => {
    setTitle("BTCN - Chơi đồ");
    if (role === "TEACHER") {
      history.push("/teacher/homework/3");
    } else if (role === "STUDENT") {
      history.push("/student/homework/2");
    }
  };
  return (
    <Container maxWidth="md">
      <h2>Bài Tập</h2>
      <List component="nav" className={classes.root}>
        <ListItem button onClick={selectHomeWork}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="BTCN - Chơi đồ" />
          <ListItemSecondaryAction>
            <p>Hết hạn 22:00, 20 tháng 3</p>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </List>
      {role === "TEACHER" ? (
        <Box align="center">
          <Button variant="contained" color="primary">
            Thêm bài tập
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default HomeWork;
