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

const TeacherAdmin = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    localStorage.setItem("title", "Teacher Admin");
    const id = JSON.parse(localStorage.getItem("user")).id;
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        filter_by: "role",
        filter_value: "TEACHER",
        order_by: "username",
        order_type: "ASC",
        page_token: 1,
        page_size: 20,
      },
    };
    axios
      .get(`/users`, params, {
        headers: header,
      })
      .then((response) => {
        setListUser(response.data.users);
        setTotalUser(response.data.users.length);
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
      {isLoading ? (
        <Loading />
      ) : (
        <ListUserAdmin
          listUser={listUser}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default withAxios(TeacherAdmin);
