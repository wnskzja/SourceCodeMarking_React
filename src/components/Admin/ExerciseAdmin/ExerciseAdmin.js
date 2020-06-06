import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationAdmin from "../NavigationAdmin";
import ListExerciseAdmin from "../ListExerciseAdmin/ListExerciseAdmin";

import { withAxios } from "../../../axios/index";
import Loading from "../../Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

const ExerciseAdmin = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listExercise, setListExercise] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalExercise, setTotalExercise] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_by: "username",
        order_type: "ASC",
        page_token: 1,
        page_size: 10,
      },
    };
    axios
      .get(`/exercises`, params, {
        headers: header,
      })
      .then((response) => {
        setListExercise(response.data.exercisees);
        setTotalExercise(response.data.exercisees.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, activePage, listExercise]);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };
  return (
    <div className={classes.root}>
      <NavigationAdmin />
      {isLoading ? (
        <Loading />
      ) : (
        <ListExerciseAdmin
          activePage={activePage}
          listExercise={listExercise}
          itemPerPage={pageSize}
          totalExercise={totalExercise}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default withAxios(ExerciseAdmin);
