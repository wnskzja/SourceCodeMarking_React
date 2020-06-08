import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import MyClass from "../MyClass/MyClass";
import { withAxios } from "../../axios/index";
import { CLASS_TYPE } from "../../constant/class";
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

const HomeStudent = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listClass, setListClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalClass, setTotalClass] = useState(0);
  const [reload, setReload] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    localStorage.setItem("title", "Lớp Học Của Tôi");
    const id = JSON.parse(localStorage.getItem("user")).id;
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_type: "ASC",
        order_by: "username",
        filter_by: "role",
        filter_value: "STUDENT",
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
  }, [axios, activePage, reload]);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };
  const Reload = () => {
    setReload(reload + 1);
  };
  return (
    <div className={classes.root}>
      <Navigation />
      {isLoading ? (
        <Loading />
      ) : (
        <MyClass
          listClass={listClass}
          type={CLASS_TYPE.STUDENT_CLASS}
          activePage={activePage}
          itemPerPage={pageSize}
          totalItems={totalClass}
          handlePageChange={handlePageChange}
          Reload={Reload}
        />
      )}
    </div>
  );
};
export default withAxios(HomeStudent);
