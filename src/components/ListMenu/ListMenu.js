import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory, useParams } from "react-router-dom";

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

const ListMenu = ({ listMenu }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleListItemClick = (name) => {
    localStorage.setItem("title", name);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("title");
    history.push("/");
  };

  return (
    <div className="Left_ListMenu">
      <List component="nav" className={classes.root}>
        {listMenu.map((item, key) => (
          <Link to={item?.link} key={key}>
            <ListItem
              button
              onClick={(event) => handleListItemClick(item.name)}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItem>
      </List>
    </div>
  );
};
export default ListMenu;
