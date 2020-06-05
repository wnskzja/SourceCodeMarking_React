import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withAxios } from "../../axios/index";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const ListFile = ({ axios, nameEx, deadlineEx }) => {
  const classes = useStyles();
  const [listFile, setListFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalFile, setTotalFile] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const pageSize = 10;
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const today = new Date();
    const deadline = new Date(deadlineEx);
    if (today <= deadline) {
      setDisabled(true);
    }
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_type: "ASC",
        page_token: activePage,
        page_size: pageSize,
      },
    };
    axios
      .get(`/exercises/${id}/files`, params, {
        headers: header,
      })
      .then((response) => {
        setListFile(response.data.files);
        setTotalFile(response.data.total_records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, id, deadlineEx, activePage]);

  const convertDateTime = (time) => {
    const daysubmit = new Date(time);
    const minutes =
      daysubmit.getMinutes() < 10
        ? "0" + daysubmit.getMinutes()
        : daysubmit.getMinutes();
    const stringDate =
      daysubmit.getDate() +
      "/" +
      (daysubmit.getMonth() + 1) +
      "/" +
      daysubmit.getFullYear() +
      " " +
      daysubmit.getHours() +
      ":" +
      minutes;
    return stringDate;
  };

  const markEx = (id) => {
    history.push(`/teacher/mark/exercise/${id}`);
  };

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              align="center"
              gutterBottom
            >
              {nameEx}
            </Typography>
            <React.Fragment>
              <Typography component="h2" variant="h6" gutterBottom>
                Danh sách nộp
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow key={1}>
                    <TableCell align="center">Tên file</TableCell>
                    <TableCell align="center">Ngày nộp</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listFile &&
                    listFile.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell align="center">{file.name}</TableCell>
                        <TableCell align="center">
                          {convertDateTime(file.created_at)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => markEx(file.id)}
                            disabled={disabled}
                          >
                            Chấm bài
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </React.Fragment>
            <Pagination
              activePage={activePage}
              itemPerPage={pageSize}
              totalItems={totalFile}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </Container>
    </div>
  );
};

ListFile.propTypes = {
  axios: PropTypes.func,
};
ListFile.defaultProps = {
  axios: () => {},
};

export default withAxios(ListFile);
