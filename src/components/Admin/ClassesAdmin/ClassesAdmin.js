import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationAdmin from "../NavigationAdmin";
import ListClassesAdmin from "../ListClassesAdmin/ListClassesAdmin";

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

const ClassesAdmin = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listClass, setListClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalClass, setTotalClass] = useState(0);
  const [reload, setReload] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    const params = {
      params: {
        order_by: "username",
        order_type: "ASC",
        page_token: 1,
        page_size: pageSize,
      },
    };
    axios
      .get(`/classes`, params, {
        headers: header,
      })
      .then((response) => {
        setListClass(response.data.classes);
        setTotalClass(response.data.classes.length);
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
        <ListClassesAdmin
          activePage={activePage}
          listClass={listClass}
          itemPerPage={pageSize}
          totalClass={totalClass}
          handlePageChange={handlePageChange}
          Reload={Reload}
        />
      )}
    </div>
  );
};
export default withAxios(ClassesAdmin);
