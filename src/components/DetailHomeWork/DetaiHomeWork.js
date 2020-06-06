import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import addFile from "../utils/addFile";
import { useParams } from "react-router-dom";
import { withAxios } from "../../axios/index";
import Loading from "../Loading/Loading";
import Home from "../Home/Home";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  button: {
    backgroundColor: "blue",
  },
  appBarSpacer: theme.mixins.toolbar,
  home: {
    padding: 15,
  },
  paper: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
}));

const DetailHomeWork = ({ axios, exercise }) => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [isLoading, setIsLoading] = useState(true);
  const [nameFile, setNameFile] = useState("Chưa chọn file");
  const [statusFile, setStatusFile] = useState(0);
  const [dataFile, setDataFile] = useState("");
  const [file, setFile] = useState({});
  const [result, setResult] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cursor, setCursor] = useState("pointer");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  useEffect(() => {
    axios
      .get(
        `/exercises/${id}/files?filter_by=user_id&filter_value=${userId}&order_type=ASC&page_token=1&page_size=20`
      )
      .then((response) => {
        if (response.data.files.length > 0) {
          const today = new Date();
          const deadline = new Date(exercise.deadline);
          if (today > deadline) {
            setStatusFile(3);
          } else {
            setStatusFile(2);
          }
          setFile(response.data.files[0]);
          if (response.data.files[0].mark) {
            setResult(true);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, userId, exercise.deadline]);

  const selectFile = (e) => {
    const file = e.target.files[0];
    new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        resolve(evt.target.result);
      };
      reader.readAsText(file);
      reader.onerror = reject;
    })
      .then((data) => {
        setDataFile(data);
      })
      .catch(function (err) {
        console.error(err);
      });
    setStatusFile(1);
    setNameFile(e.target.files[0].name);
  };

  const submitFile = () => {
    setDisabled(true);
    document.body.style.cursor = "wait";
    setCursor("wait");
    const dataRequest = {
      exercise_id: id,
      name: nameFile,
      data: dataFile,
    };
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post("/files", dataRequest, {
        headers: header,
      })
      .then((response) => {
        setFile(response.data);
        setStatusFile(2);
        setDisabled(false);
        setMessage("Đã Nộp!");
        setTypeAlert(ALERT_TYPE.SUCCESS);
        document.body.style.cursor = "default";
        setCursor("pointer");
      })
      .catch((error) => {
        document.body.style.cursor = "default";
        setMessage("Nộp thất bại!");
        setTypeAlert(ALERT_TYPE.ERROR);
      })
      .finally(() => {});
  };

  const removeFile = () => {
    setDisabled(true);
    document.body.style.cursor = "wait";
    setCursor("wait");
    axios
      .delete(`/files/${file.id}`)
      .then((response) => {
        if (response.status === 204) {
          setNameFile("Chưa chọn file");
          setStatusFile(0);
          setFile({});
          setDisabled(false);
          document.body.style.cursor = "default";
          setCursor("pointer");
        }
      })
      .catch((error) => {
        document.body.style.cursor = "default";
        console.error(error);
      })
      .finally(() => {});
  };

  const renderButton = () => {
    if (statusFile === 2) {
      return (
        <Button
          size="small"
          fullWidth
          color="primary"
          variant="contained"
          onClick={removeFile}
          disabled={disabled}
          cursor={cursor}
        >
          Hủy
        </Button>
      );
    } else if (statusFile === 1) {
      return (
        <Button
          size="small"
          fullWidth
          color="primary"
          onClick={submitFile}
          variant="contained"
          disabled={disabled}
          cursor={cursor}
        >
          Nộp
        </Button>
      );
    } else if (statusFile === 0) {
      return (
        <Button
          size="small"
          fullWidth
          color="primary"
          onClick={() => addFile((e) => selectFile(e))}
          variant="contained"
        >
          Chọn file
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          fullWidth
          color="primary"
          variant="contained"
          disabled
        >
          Đóng
        </Button>
      );
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
    return <p style={{ fontSize: "13px" }}>Deadline: {stringDate}</p>;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Alert message={message} type={typeAlert} />
          <h2 style={{ textAlign: "center" }}>{exercise.name}</h2>
          {result ? (
            <div className={classes.home}>
              <h3>Kết quả: {file.mark} điểm</h3>
              <Home idFile={file.id} />
            </div>
          ) : (
            <>
              <Container maxWidth="md">
                <Grid xs={12} item container>
                  <Grid item xs={8}>
                    <Paper elevation={0} className={classes.paper}>
                      <p>Mô tả: {exercise.description}</p>
                      {renderDeadline(exercise.deadline)}
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.root}>
                      <CardContent>
                        <h3>Bài Nộp</h3>
                        <p>{file.name ? file.name : nameFile}</p>
                      </CardContent>
                      <CardActions>{renderButton()}</CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default withAxios(DetailHomeWork);
