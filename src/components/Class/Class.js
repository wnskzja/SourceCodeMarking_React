import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popper from "@material-ui/core/Popper";
import Link from "@material-ui/core/Link";
import { withAxios } from "../../axios/index";
import { CLASS_TYPE } from "../../constant/class";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";

const useStyles = (theme) =>
  makeStyles({
    root: {
      minWidth: 275,
      "&:hover": {
        cursor: "pointer",
      },
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    classStore: {
      minWidth: 275,
    },
    expand: {
      display: "flex",
      justifyContent: "space-between",
    },
  });

const Class = ({ axios, infoClass, type, deleteClass }) => {
  const classes = useStyles();
  const [cursor, setCursor] = useState("pointer");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const enrollClass = () => {
    document.body.style.cursor = "wait";
    setCursor("wait");
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post(`classes/${infoClass.id}/enroll`, {
        headers: header,
      })
      .then((response) => {
        document.body.style.cursor = "default";
        setCursor("pointer");
        setMessage("Enroll lớp thành công");
        setTypeAlert(ALERT_TYPE.SUCCESS);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Enroll lớp thất bại!");
        setTypeAlert(ALERT_TYPE.ERROR);
      })
      .finally(() => {});
  };

  const clickClassTeacher = () => {
    history.push(`/teacher/class/${infoClass.id}`);
    localStorage.setItem("title", infoClass.name);
  };

  const renderClass = () => {
    switch (type) {
      case CLASS_TYPE.CLASS_STORE:
        return (
          <Card className={classes.classStore}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {infoClass.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                GV: {infoClass.teachers[0].name}
              </Typography>
              <Typography variant="body2" component="p">
                Mô tả: {infoClass.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={enrollClass}
                style={{ cursor }}
              >
                Enroll
              </Button>
            </CardActions>
          </Card>
        );
      case CLASS_TYPE.STUDENT_CLASS:
        return (
          <Link
            href={`/student/class/${infoClass.id}`}
            onClick={() => {
              localStorage.setItem("title", infoClass.name);
            }}
            underline="none"
          >
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {infoClass.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  GV: {infoClass.teachers[0].name}
                </Typography>
                <Typography variant="body2" component="p">
                  Mô tả: {infoClass.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      case CLASS_TYPE.TEACHER_CLASS:
        return (
          <Card className={classes.root}>
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ cursor: "pointer" }}
                  onClick={clickClassTeacher}
                >
                  {infoClass.name}
                </Typography>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  style={{ marginTop: "-10px" }}
                  onClick={handleClick}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Popper open={open} anchorEl={anchorEl}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Menu id="simple-menu">
                      <MenuItem
                        onClick={() => deleteClass(infoClass.id)}
                        style={{
                          fontSize: "13px",
                          marginTop: "-20px",
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </ClickAwayListener>
                </Popper>
              </div>

              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ cursor: "pointer" }}
                onClick={clickClassTeacher}
              >
                GV: {infoClass.teachers[0].name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ cursor: "pointer" }}
                onClick={clickClassTeacher}
              >
                Mô tả: {infoClass.description}
              </Typography>
            </CardContent>
          </Card>
        );
      default:
        break;
    }
  };
  const clearMessage = () => {
    setMessage("");
  };
  return (
    <Grid xs={4} item>
      {message ? (
        <Alert message={message} clearMessage={clearMessage} type={typeAlert} />
      ) : null}
      {renderClass()}
    </Grid>
  );
};
export default withAxios(Class);
