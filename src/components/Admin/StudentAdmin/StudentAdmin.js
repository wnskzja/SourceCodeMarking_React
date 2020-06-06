import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationAdmin from "../NavigationAdmin";
import ListUserAdmin from "../ListUserAdmin/ListUserAdmin";
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

const StudentAdmin = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listClass, setListClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalClass, setTotalClass] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    localStorage.setItem("title", "Student");
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
        console.log(response);
        // setListClass(response.data.classes);
        // setTotalClass(response.data.total_records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [axios, activePage]);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };
  return (
    <div className={classes.root}>
      <NavigationAdmin />
      {isLoading ? <Loading /> : <ListUserAdmin />}
    </div>
  );
};
export default withAxios(StudentAdmin);
