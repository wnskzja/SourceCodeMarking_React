import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
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
  Paper,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ClassIcon from "@material-ui/icons/Class";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ListAltIcon from "@material-ui/icons/ListAlt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import ListMenu from "../ListMenu/ListMenu";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/MenuList";
import { withAxios } from "../../axios/index";
import { GlobalContext } from "../../ReactContext/ReactContext";

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
  noti: {
    zIndex: 2000,
  },
  paperNoti: {
    color: "black",
    backgroundColor: theme.palette.background.paper,
  },
  isRead: {
    backgroundColor: "#E5EAF2",
  },
}));

const Navigation = ({ hidden, createClass, axios }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(hidden);
  const title = localStorage.getItem("title");
  const [openDiaglog, setOpenDialog] = useState(false);
  const [nameClass, setNameClass] = useState("");
  const [desClass, setDesClass] = useState("");
  const [errorText, setErrorText] = useState("");
  const role = JSON.parse(localStorage.getItem("user")).role;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { listNotification, setIsReadNoti } = useContext(GlobalContext);
  const openNoti = Boolean(anchorEl);
  const listMenuStudent = [
    { name: "Lớp Học Của Tôi", icon: ClassIcon, link: "/student" },
    {
      name: "Danh Sách Các Lớp",
      icon: ListAltIcon,
      link: "/student/listclass",
    },
    { name: "Thông Tin", icon: PermIdentityIcon, link: "/student/profile" },
    {
      name: "Thông Báo",
      icon: NotificationsIcon,
      link: "/student/notifications",
    },
    {
      name: "Đổi mật khẩu",
      icon: VpnKeyIcon,
      link: "/student/changepassword",
    },
  ];
  const listMenuTeacher = [
    { name: "Danh Sách Lớp Học", icon: ClassIcon, link: "/teacher" },
    { name: "Thông Tin", icon: PermIdentityIcon, link: "/teacher/profile" },
    {
      name: "Đổi mật khẩu",
      icon: VpnKeyIcon,
      link: "/teacher/changepassword",
    },
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNoti = () => {
    setAnchorEl(null);
  };

  const clickCreate = (e) => {
    e.preventDefault();
    if (nameClass) {
      const dataRequest = {
        name: nameClass,
        description: desClass,
      };
      createClass(dataRequest);
      setOpenDialog(false);
    } else {
      setErrorText("Vui lòng không để trống");
    }
  };
  const clickNoti = (id, idEx) => {
    axios
      .patch(`notifications/${id}`)
      .then((response) => {
        console.log("clickNoti -> response", response);
        setIsReadNoti(id);
        history.push(`/student/exercise/${idEx}`);
      })
      .catch((error) => {})
      .finally(() => {});
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
          <IconButton color="inherit" onClick={handleClick}>
            <Badge
              badgeContent={
                listNotification
                  ? listNotification.filter((d) => d.is_read === false).length
                  : 0
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popper open={openNoti} anchorEl={anchorEl} className={classes.noti}>
            <ClickAwayListener onClickAway={handleCloseNoti}>
              <Paper className={classes.paperNoti} elevation={3}>
                <Menu id="simple-menu" keepMounted>
                  {listNotification &&
                    listNotification.map((item) => (
                      <div key={item.id}>
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            fontWeight: 450,
                          }}
                          className={item.is_read ? "" : classes.isRead}
                          onClick={() => clickNoti(item.id, item.exercise_id)}
                        >
                          {item.content}
                        </MenuItem>
                        <Divider />
                      </div>
                    ))}
                  <div
                    style={{
                      marginTop: 5,
                      textAlign: "center",
                    }}
                  >
                    <Link
                      to={"/student/notifications"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Xem tất cả
                    </Link>
                  </div>
                </Menu>
              </Paper>
            </ClickAwayListener>
          </Popper>
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
            error={Boolean(errorText)}
            helperText={errorText}
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

export default withAxios(Navigation);
