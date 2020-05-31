import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import addFile from "../utils/addFile";
import { withAxios } from "../../axios/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    backgroundColor: "blue",
  },
}));

const DetailHomeWork = ({ axios }) => {
  const classes = useStyles();
  const [nameFile, setNameFile] = useState("Chưa chọn file");
  const [isAddFile, setIsAddFile] = useState(false);
  const [dataFile, setDataFile] = useState("");
  const { id } = useParams();
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
        console.log(err);
      });

    setNameFile(e.target.files[0].name);
    setIsAddFile(true);
  };
  const submitFile = () => {
    const dataRequest = {
      exercise_id: "12",
      name: "BTCN - Choi Do",
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
        console.log("submitFile -> response", response);
      })
      .catch((error) => {
        console.log("submitFile -> error", error);
      })
      .finally(() => {});
  };
  return (
    <Container maxWidth="md">
      <Grid xs={12} item container>
        <Grid item xs={8}>
          <Paper elevation={0}>
            <h2>BTCN - Chơi Đồ</h2>
            <p>Chơi 2kg đồ</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <h3>Bài Nộp</h3>
              <p>{nameFile}</p>
            </CardContent>
            <CardActions>
              {isAddFile ? (
                <Button
                  size="small"
                  fullWidth
                  color="primary"
                  onClick={submitFile}
                  variant="contained"
                >
                  Nộp
                </Button>
              ) : (
                <Button
                  size="small"
                  fullWidth
                  color="primary"
                  onClick={() => addFile((e) => selectFile(e))}
                  variant="contained"
                >
                  Chọn file
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAxios(DetailHomeWork);
