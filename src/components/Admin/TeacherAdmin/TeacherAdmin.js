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
  const [reload, setReload] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        filter_by: "role",
        filter_value: "TEACHER",
        order_by: "username",
        order_type: "ASC",
        page_token: activePage,
        page_size: pageSize,
      },
    };
    axios
      .get(`/users`, params, {
        headers: header,
      })
      .then((response) => {
        setListUser(response.data.users);
        setTotalUser(response.data.total_records);
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
      <NavigationAdmin />
      {isLoading ? (
        <Loading />
      ) : (
        <ListUserAdmin
          activePage={activePage}
          listUser={listUser}
          itemPerPage={pageSize}
          totalUser={totalUser}
          handlePageChange={handlePageChange}
          Reload={Reload}
        />
      )}
    </div>
  );
};
export default withAxios(TeacherAdmin);
