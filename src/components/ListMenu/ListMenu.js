import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../ReactContext/ReactContext";

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
  const { setTitle } = useContext(GlobalContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index, name) => {
    setSelectedIndex(index);
    setTitle(name);
  };

  return (
    <div className="Left_ListMenu">
      <List component="nav" className={classes.root}>
        {listMenu.map((item, key) => (
          <Link to={item?.link} key={key}>
            <ListItem
              button
              onClick={(event) => handleListItemClick(event, key, item.name)}
              className={
                selectedIndex === key
                  ? `${classes.child} ${classes.selected}`
                  : classes.child
              }
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};
export default ListMenu;
