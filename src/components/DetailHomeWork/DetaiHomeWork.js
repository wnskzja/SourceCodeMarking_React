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
}));

const DetailHomeWork = ({ axios, exercise }) => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  console.log("DetailHomeWork -> userId", userId);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFile, setNameFile] = useState("Chưa chọn file");
  const [statusFile, setStatusFile] = useState(0);
  const [dataFile, setDataFile] = useState("");
  const [file, setFile] = useState({});
  const [result, setResult] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `/exercises/${id}/files?filter_by=user_id&filter_value=${userId}&order_type=ASC&page_token=1&page_size=20`
      )
      .then((response) => {
        console.log("DetailHomeWork -> response", response);
        if (response.data.files.length > 0) {
          setStatusFile(2);
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
  }, [axios, id, userId]);

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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const removeFile = () => {
    setDisabled(true);
    axios
      .delete(`/files/${file.id}`)
      .then((response) => {
        if (response.status === 204) {
          setNameFile("Chưa chọn file");
          setStatusFile(0);
          setFile({});
          setDisabled(false);
        }
      })
      .catch((error) => {
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
        >
          Nộp
        </Button>
      );
    } else {
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
    }
  };
  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />

      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                    <Paper elevation={0}>
                      <p>{exercise.description}</p>
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
        </>
      )}
    </div>
  );
};

export default withAxios(DetailHomeWork);
