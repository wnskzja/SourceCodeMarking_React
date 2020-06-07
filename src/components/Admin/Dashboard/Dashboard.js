import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChartClasses from "../ChartClasses/ChartClasses";
import ChartExercises from "../ChartExercises/ChartExercises";
import ChartTeacher from "../ChartTeacher/ChartTeacher";
import ChartStudent from "../ChartStudent/ChartStudent";
import NavigationAdmin from "../NavigationAdmin";
import { withAxios } from "../../../axios/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  titleAboveChart: {
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "30px",
    fontWeight: "bold",
    fontSize: "16px",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { axios } = props;
  const [teacherData, setTeacherData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [classData, setClassData] = useState("");
  const [exerciseData, setExerciseData] = useState("");

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
      .get(`/classes`, params, {
        headers: header,
      })
      .then((response) => {
        setClassData(response.data.classes);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    axios
      .get(`/exercises`, params, {
        headers: header,
      })
      .then((response) => {
        setExerciseData(response.data.exercisees);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    const paramsTeacher = {
      params: {
        filter_by: "role",
        filter_value: "TEACHER",
        order_by: "username",
        order_type: "ASC",
        page_token: 1,
        page_size: 10,
      },
    };
    axios
      .get(`/users`, paramsTeacher, {
        headers: header,
      })
      .then((response) => {
        setTeacherData(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    const paramsStudent = {
      params: {
        filter_by: "role",
        filter_value: "STUDENT",
        order_by: "username",
        order_type: "ASC",
        page_token: 1,
        page_size: 10,
      },
    };
    axios
      .get(`/users`, paramsStudent, {
        headers: header,
      })
      .then((response) => {
        setStudentData(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  return (
    <div className={classes.root}>
      <NavigationAdmin />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item xs={12} md={8} lg={9}>
              <Grid>
                <Paper>
                  <ChartTeacher type="teacher" data={teacherData} />
                </Paper>
                <div className={classes.titleAboveChart}>Giáo viên</div>
              </Grid>

              <Grid>
                <Paper>
                  <ChartStudent type="student" data={studentData} />
                </Paper>
                <div className={classes.titleAboveChart}>Học sinh</div>
              </Grid>

              <Grid>
                <Paper>
                  <ChartClasses type="classes" data={classData} />
                </Paper>
                <div className={classes.titleAboveChart}>Lớp học</div>
              </Grid>

              <Grid>
                <Paper>
                  <ChartExercises type="exercises" data={exerciseData} />
                </Paper>
                <div className={classes.titleAboveChart}>Bài tập</div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default withAxios(Dashboard);
