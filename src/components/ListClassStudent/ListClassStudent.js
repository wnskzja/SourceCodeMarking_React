import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../Navigation/Navigation";
import MyClass from "../MyClass/MyClass";
import { withAxios } from "../../axios/index";
import { CLASS_TYPE } from "../../constant/class";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const ListClassStudent = ({ axios }) => {
  const classes = useStyles();
  const [listClass, setListClass] = useState([]);
  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `/classes?&order_by=username&order_type=ASC&page_token=1&page_size=20`,
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
  }, [axios]);
  return (
    <div className={classes.root}>
      <Navigation />
      <MyClass listClass={listClass} type={CLASS_TYPE.CLASS_STORE} />
    </div>
  );
};
export default withAxios(ListClassStudent);
