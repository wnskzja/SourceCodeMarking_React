import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
  CircularProgress,
  Fade,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { withAxios } from "../../axios/index";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const HomeWork = ({ axios }) => {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [openDiaglog, setOpenDialog] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [nameEx, setNameEx] = useState("");
  const [errorText, setErrorText] = useState("");
  const [desEx, setDesEx] = useState("");
  const [deadline, setDeadline] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const [listEx, setListEx] = useState([]);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [process, setProcess] = useState(false);
  const [totalEx, setTotalEx] = useState(0);
  const pageSize = 10;

  const role = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_type: "ASC",
        order_by: "username",
        page_token: activePage,
        page_size: pageSize,
      },
    };
    axios
      .get(`/classes/${id}/exercises`, params, {
        headers: header,
      })
      .then((response) => {
        setListEx(response.data.exercisees);
        setTotalEx(response.data.total_records);
        setIsLoading(false);
        setProcess(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, count, activePage]);

  const selectExercise = (name, id) => {
    if (role === "TEACHER") {
      history.push(`/teacher/exercise/${id}`);
    } else if (role === "STUDENT") {
      history.push(`/student/exercise/${id}`);
    }
  };

  const handleClickOpen = () => {
    const today = new Date();
    const string =
      today.toISOString().substr(0, 10) +
      "T" +
      today.toTimeString().substr(0, 5);
    setCurrentDay(string);
    setDeadline(today.toISOString());
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setNameEx(value);
    } else if (name === "desExercise") {
      setDesEx(value);
    } else {
      const date = new Date(value).toISOString();
      setDeadline(date);
    }
  };

  const renderDeadline = (time) => {
    const deadline = new Date(time);
    const minutes =
      deadline.getMinutes() < 10
        ? "0" + deadline.getMinutes()
        : deadline.getMinutes();
    const stringDate =
      deadline.getHours() +
      ":" +
      minutes +
      ", ngày " +
      deadline.getDate() +
      " tháng " +
      (deadline.getMonth() + 1);
    return <p style={{ fontSize: "13px" }}>Hết hạn {stringDate}</p>;
  };

  const createExercise = () => {
    if (nameEx) {
      setProcess(true);
      const header = {
        "Content-Type": "application/json",
      };
      const dataRequest = {
        class_id: id,
        name: nameEx,
        description: desEx,
        deadline: deadline,
      };
      axios
        .post("/exercises", dataRequest, {
          headers: header,
        })
        .then((response) => {
          if (response.status === 201) {
            setCount(count + 1);
            setMessage("Tạo Bài Tập Thành Công");
            setTypeAlert(ALERT_TYPE.SUCCESS);
          }
        })
        .catch((error) => {
          setMessage("Tạo Bài Tập Thất Bại");
          setTypeAlert(ALERT_TYPE.ERROR);
        })
        .finally(() => {});
      setOpenDialog(false);
    } else {
      setErrorText("Vui lòng không để trống");
    }
  };

  const clearMessage = () => {
    setMessage("");
  };

  const deleteEx = (id) => {
    setProcess(true);
    axios
      .delete(`/exercises/${id}`)
      .then((response) => {
        setCount(count + 1);
        setMessage("Đã Xóa");
        setTypeAlert(ALERT_TYPE.SUCCESS);
      })
      .catch((error) => {
        setMessage("Xóa Thất Bại");
        setTypeAlert(ALERT_TYPE.ERROR);
      })
      .finally(() => {});
  };

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      {message ? (
        <Alert message={message} clearMessage={clearMessage} type={typeAlert} />
      ) : null}
      <Container maxWidth="md">
        <h2>Bài Tập</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <List component="nav" className={classes.list}>
            {listEx &&
              listEx.map((item) => (
                <div key={item.id}>
                  <ListItem
                    button
                    onClick={() => selectExercise(item.name, item.id)}
                  >
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <Grid container xs={12} item>
                        {renderDeadline(item.deadline)}
                        {role === "TEACHER" ? (
                          <IconButton onClick={() => deleteEx(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        ) : null}
                      </Grid>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>
              ))}
          </List>
        )}
        {role === "TEACHER" ? (
          <Box align="center">
            <div>
              <Fade in={process} unmountOnExit>
                <CircularProgress />
              </Fade>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              disabled={process}
            >
              Thêm bài tập
            </Button>
          </Box>
        ) : null}
        <Pagination
          activePage={activePage}
          itemPerPage={pageSize}
          totalItems={totalEx}
          handlePageChange={handlePageChange}
        />

        <Dialog
          open={openDiaglog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thêm bài tập</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Tên bài tập"
              type="text"
              error={errorText}
              helperText={errorText}
              fullWidth
              onChange={onChange}
              required
            />
            <TextField
              margin="dense"
              id="desExercise"
              name="desExercise"
              label="Mô tả"
              type="text"
              fullWidth
              onChange={onChange}
            />
            <TextField
              id="datetime-local"
              label="Deadline"
              type="datetime-local"
              name="dateTime"
              defaultValue={currentDay}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default" variant="contained">
              Hủy
            </Button>
            <Button
              onClick={createExercise}
              color="primary"
              variant="contained"
            >
              Tạo
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default withAxios(HomeWork);
