import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import DetailHomeWork from "../DetailHomeWork/DetaiHomeWork";
import { withAxios } from "../../axios/index";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const StudentExercise = ({ axios }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [exercise, setExercise] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const history = useHistory();

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .get(`/exercises/${id}`, {
        headers: header,
      })
      .then((response) => {
        setExercise(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorText = error.response.data.error.message;
        if (errorText === "Not found exercise") {
          setMessage("");
          setMessage("Bài tập đã bị xóa");
          setTypeAlert(ALERT_TYPE.ERROR);
          setTimeout(() => history.goBack(), 1500);
        }
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, history]);
  return (
    <div className={classes.root}>
      <Alert message={message} type={typeAlert} />
      <Navigation hidden={false} />
      {isLoading ? <Loading /> : <DetailHomeWork exercise={exercise} />}
    </div>
  );
};
export default withAxios(StudentExercise);
