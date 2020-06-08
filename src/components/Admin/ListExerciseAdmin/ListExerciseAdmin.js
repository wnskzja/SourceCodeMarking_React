import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withAxios } from "../../../axios/index";
import Pagination from "../../Pagination/Pagination";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Alert from "../../Alert/Alert";
import DialogEditExercise from "../DialogEditExercise/DialogEditExercise";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { ALERT_TYPE } from "../../../constant/alert";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
  table: {
    minWidth: 650,
  },
}));

const ListExerciseAdmin = ({
  listExercise,
  type,
  activePage,
  itemPerPage,
  totalExercise,
  handlePageChange,
  deleteClass,
  axios,
  Reload,
}) => {
  const classes = useStyles();
  const [exercise, setExercise] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState(ALERT_TYPE.SUCCESS);

  const handleEditExercise = ({ exercise }) => {
    setExercise(exercise);
  };

  const handleDeleteExercise = ({ exercise }) => {
    const header = {
      "Content-Type": "application/json",
    };
    setMessage("");
    axios
      .delete(`/exercises/${exercise.id}`, {
        headers: header,
      })
      .then((response) => {
        Reload();
        setMessage("Xóa thành công");
        setTypeAlert("success");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const formatDate = (string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(string).toLocaleDateString([], options);
    const time = string.slice(11, 19);
    const result = date + " " + time;
    return result;
  };

  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Table
            size="small"
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Tên bài tập</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Thời hạn nộp bài</TableCell>
                <TableCell align="center">Chưa xóa</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listExercise &&
                listExercise.map((exercise) => (
                  <TableRow key={`list-class-wrap-class-${exercise.id}`}>
                    <TableCell component="th" scope="row">
                      {exercise?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {exercise?.description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {formatDate(exercise?.deadline)}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {exercise?.is_deleted ? (
                        <ClearIcon color="secondary" />
                      ) : (
                        <DoneIcon style={{ color: green[500] }} />
                      )}
                    </TableCell>
                    <TableCell scope="row" align="right">
                      {exercise.is_deleted ? null : (
                        <>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditExercise({ exercise })}
                          >
                            <CreateIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteExercise({ exercise })}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
        <Pagination
          activePage={activePage}
          itemPerPage={itemPerPage}
          totalItems={totalExercise}
          handlePageChange={(e, value) => handlePageChange(e, value)}
        />
      </Container>
      <DialogEditExercise
        exercise={exercise}
        handleEditExercise={handleEditExercise}
        Reload={Reload}
      />
      <Alert message={message} type={typeAlert} />
    </div>
  );
};
export default withAxios(ListExerciseAdmin);
