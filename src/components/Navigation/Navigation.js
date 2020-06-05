import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Badge,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ClassIcon from "@material-ui/icons/Class";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ListAltIcon from "@material-ui/icons/ListAlt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import ListMenu from "../ListMenu/ListMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    color: "white",
    backgroundColor: "#3f51b5",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const Navigation = ({ hidden, createClass }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(hidden);
  const title = localStorage.getItem("title");
  const [openDiaglog, setOpenDialog] = useState(false);
  const [nameClass, setNameClass] = useState("");
  const [desClass, setDesClass] = useState("");
  const role = JSON.parse(localStorage.getItem("user")).role;
  const listMenuStudent = [
    { name: "Lớp Học Của Tôi", icon: ClassIcon, link: "/student" },
    {
      name: "Danh Sách Các Lớp",
      icon: ListAltIcon,
      link: "/student/listclass",
    },
    { name: "Thông Tin", icon: PermIdentityIcon, link: "/student/profile" },
  ];
  const listMenuTeacher = [
    { name: "Danh Sách Lớp Học", icon: ClassIcon, link: "/teacher" },
    { name: "Danh Sách Đăng Kí", icon: ListAltIcon, link: "/teacher/list" },
    { name: "Thông Tin", icon: PermIdentityIcon, link: "/teacher/profile" },
  ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "nameClass") {
      setNameClass(value);
    } else {
      setDesClass(value);
    }
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const clickCreate = (e) => {
    e.preventDefault();
    const dataRequest = {
      name: nameClass,
      description: desClass,
    };
    createClass(dataRequest);
    setOpenDialog(false);
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          {role === "TEACHER" ? (
            <Tooltip title="Tạo lớp học">
              <IconButton color="inherit" onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <h3>Source Code Marking</h3>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListMenu
          listMenu={role === "TEACHER" ? listMenuTeacher : listMenuStudent}
        />
      </Drawer>
      <Dialog
        open={openDiaglog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tạo lớp học</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="nameClass"
            label="Tên lớp *"
            type="text"
            fullWidth
            onChange={onChange}
          />
          <TextField
            margin="dense"
            id="desClass"
            name="desClass"
            label="Mô tả"
            type="text"
            fullWidth
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={clickCreate} color="primary">
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Navigation.propTypes = {
  hidden: PropTypes.bool,
  createClass: PropTypes.func,
};
Navigation.defaultProps = {
  hidden: true,
  createClass: () => {},
};

export default Navigation;
