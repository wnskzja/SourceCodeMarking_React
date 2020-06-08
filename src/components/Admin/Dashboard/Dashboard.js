import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChartClasses from "../ChartClasses/ChartClasses";
import ChartExercises from "../ChartExercises/ChartExercises";
import ChartTeacher from "../ChartTeacher/ChartTeacher";
import ChartStudent from "../ChartStudent/ChartStudent";
import ChartTotal from "../ChartTotal/ChartTotal";
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

const createDateStart = () => {
  const today = new Date();
  const last30Day = new Date(today.setDate(today.getDate() - 30));
  return last30Day;
};

const Dashboard = (props) => {
  const classes = useStyles();
  const { axios } = props;
  const [startDate, setStartDate] = useState(createDateStart);
  const [endDate, setEndDate] = useState(new Date());
  const [teacherData, setTeacherData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [classData, setClassData] = useState("");
  const [exerciseData, setExerciseData] = useState("");

  const initStartAndEndDate = () => {
    const resultStartDate =
      startDate.toISOString().substr(0, 10) +
      "T" +
      startDate.toTimeString().substr(0, 8) +
      "Z";
    setStartDate(resultStartDate);

    const resultEndDate =
      endDate.toISOString().substr(0, 10) +
      "T" +
      endDate.toTimeString().substr(0, 8) +
      "Z";
    setEndDate(resultEndDate);
  };

  useEffect(() => {
    initStartAndEndDate();
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        begin_date: startDate,
        end_date: endDate,
        user_role: "",
      },
    };
    axios
      .get(`/classes/statistic`, params, {
        headers: header,
      })
      .then((response) => {
        console.log("Class: ", response);
        setClassData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    axios
      .get(`/exercises/statistic`, params, {
        headers: header,
      })
      .then((response) => {
        setExerciseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    const paramsTeacher = {
      params: {
        begin_date: startDate,
        end_date: endDate,
        user_role: "TEACHER",
      },
    };
    axios
      .get(`/users/statistic`, paramsTeacher, {
        headers: header,
      })
      .then((response) => {
        setTeacherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});

    const paramsStudent = {
      params: {
        begin_date: startDate,
        end_date: endDate,
        user_role: "STUDENT",
      },
    };
    axios
      .get(`/users/statistic`, paramsStudent, {
        headers: header,
      })
      .then((response) => {
        setStudentData(response.data);
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
                  <ChartTotal
                    type="total"
                    dataTeacher={teacherData}
                    dataStudent={studentData}
                    dataClass={classData}
                    dataExercise={exerciseData}
                  />
                </Paper>
                <div className={classes.titleAboveChart}>
                  Biểu đồ thống kê về giáo viên, học sinh, lớp học, bài tập
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default withAxios(Dashboard);
