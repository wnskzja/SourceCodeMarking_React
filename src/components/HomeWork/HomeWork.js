import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const HomeWork = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <h2>Bài Tập</h2>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem button>
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
    </Container>
  );
};

export default HomeWork;
