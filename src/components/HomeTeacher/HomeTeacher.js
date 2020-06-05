import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import MyClass from "../MyClass/MyClass";
import Alert from "../Alert/Alert";
import { withAxios } from "../../axios/index";
import { CLASS_TYPE } from "../../constant/class";
import { ALERT_TYPE } from "../../constant/alert";
import Loading from "../Loading/Loading";

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

const HomeTeacher = ({ axios }) => {
  const classes = useStyles();
  const [listClass, setListClass] = useState([]);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalClass, setTotalClass] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_type: "ASC",
        order_by: "username",
        page_token: activePage,
        page_size: pageSize,
      },
    };
    axios
      .get(`/users/${id}/classes`, params, {
        headers: header,
      })
      .then((response) => {
        setListClass(response.data.classes);
        setTotalClass(response.data.total_records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios]);

  const createClass = (dataRequest) => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post(`/classes`, dataRequest, {
        headers: header,
      })
      .then((response) => {
        setMessage("Tạo lớp thành công!");
        setTypeAlert(ALERT_TYPE.SUCCESS);
        axios
          .get(
            `/users/${id}/classes?order_by=username&order_type=ASC&page_token=1&page_size=20`,
            {
              headers: header,
            }
          )
          .then((response) => {
            setListClass(response.data.classes);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {});
      })
      .catch((error) => {
        setMessage("Tạo lớp thất bại!");
        setTypeAlert(ALERT_TYPE.ERROR);
      })
      .finally(() => {});
  };

  const clearMessage = () => {
    setMessage("");
  };
  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  return (
    <div className={classes.root}>
      <Navigation createClass={(data) => createClass(data)} />
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <MyClass
          listClass={listClass}
          type={CLASS_TYPE.TEACHER_CLASS}
          activePage={activePage}
          itemPerPage={pageSize}
          totalItems={totalClass}
          handlePageChange={handlePageChange}
        />
      )}

      {message ? (
        <Alert message={message} clearMessage={clearMessage} type={typeAlert} />
      ) : null}
    </div>
  );
};
export default withAxios(HomeTeacher);
