import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ClassIcon from "@material-ui/icons/Class";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom";

import "./ListMenu.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  child: {
    marginTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#00ACC1",
      color: "white",
    },
  },
  selected: {
    backgroundColor: "#00ACC1",
    color: "white",
  },
}));

const ListMenu = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="HomeTeacher_ListMenu">
      <List component="nav" className={classes.root}>
        <Link to="/teacher/classes">
          <ListItem
            button
            onClick={(event) => handleListItemClick(event, 0)}
            className={
              selectedIndex === 0
                ? `${classes.child} ${classes.selected}`
                : classes.child
            }
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Danh Sách Lớp Học" />
          </ListItem>
        </Link>
        <ListItem
          button
          onClick={(event) => handleListItemClick(event, 1)}
          className={
            selectedIndex === 1
              ? `${classes.child} ${classes.selected}`
              : classes.child
          }
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Tạo Lớp" />
        </ListItem>
        <Link to="/teacher/list">
          <ListItem
            button
            className={
              selectedIndex === 2
                ? `${classes.child} ${classes.selected}`
                : classes.child
            }
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Danh Sách Đăng Kí" />
          </ListItem>
        </Link>
        <Link to="/teacher/profile">
          <ListItem
            button
            className={
              selectedIndex === 3
                ? `${classes.child} ${classes.selected}`
                : classes.child
            }
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            <ListItemText primary="Thông Tin" />
          </ListItem>
        </Link>
        <ListItem button className={classes.child}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng Xuất" />
        </ListItem>
      </List>
    </div>
  );
};
export default ListMenu;
