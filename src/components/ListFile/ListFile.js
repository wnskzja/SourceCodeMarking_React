import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withAxios } from "../../axios/index";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "../Pagination/Pagination";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  appBarSpacer: theme.mixins.toolbar,
  textarea: {
    width: "100%",
    outline: "none",
    backgroundColor: "transparent",
    padding: 5,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "15px",
    resize: "none",
  },
}));

const ListFile = ({ axios, nameEx, deadlineEx, descriptionEx, updateDes }) => {
  const classes = useStyles();
  const [listFile, setListFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalFile, setTotalFile] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [enableDes, setEnableDes] = useState(true);
  const [newDes, setNewDes] = useState(descriptionEx);
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

  const onChange = (e) => {
    setNewDes(e.target.value);
  };
  const clickUpdate = () => {
    updateDes(newDes);
    setEnableDes(true);
  };

  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              align="center"
              gutterBottom
            >
              {nameEx}
            </Typography>
            <Typography component="h2" variant="h6" gutterBottom>
              Mô tả
              <Tooltip title="Chỉnh sửa mô tả">
                {enableDes ? (
                  <IconButton
                    onClick={() => {
                      setEnableDes(false);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={clickUpdate}>
                    <CheckIcon />
                  </IconButton>
                )}
              </Tooltip>
            </Typography>
            <textarea
              className={classes.textarea}
              defaultValue={`${descriptionEx}`}
              disabled={enableDes}
              onChange={onChange}
              rows="10"
            ></textarea>

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
            {listFile.length > 0 ? (
              <Pagination
                activePage={activePage}
                itemPerPage={pageSize}
                totalItems={totalFile}
                handlePageChange={handlePageChange}
              />
            ) : (
              ""
            )}
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
