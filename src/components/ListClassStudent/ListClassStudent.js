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
}));

const ListClassStudent = ({ axios }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [listClass, setListClass] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalClass, setTotalClass] = useState(0);
  const pageSize = 12;

  useEffect(() => {
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
      .get("/classes", params, {
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
  }, [axios, activePage]);
  const handlePageChange = (event, value) => {
    setActivePage(value);
  };
  return (
    <div className={classes.root}>
      <Navigation />
      {isLoading ? (
        <Loading />
      ) : (
        <MyClass
          listClass={listClass}
          type={CLASS_TYPE.CLASS_STORE}
          activePage={activePage}
          itemPerPage={pageSize}
          totalItems={totalClass}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default withAxios(ListClassStudent);
