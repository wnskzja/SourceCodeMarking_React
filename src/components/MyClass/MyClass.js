import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Class from "../Class/Class";
import { withAxios } from "../../axios/index";
import Pagination from "../Pagination/Pagination";

const useStyles = makeStyles((theme) => ({
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

const MyClass = ({
  listClass,
  type,
  activePage,
  itemPerPage,
  totalItems,
  handlePageChange,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          {listClass &&
            listClass.map((item) => (
              <Class infoClass={item} key={item.id} type={type} />
            ))}
        </Grid>
        <Pagination
          activePage={activePage}
          itemPerPage={itemPerPage}
          totalItems={totalItems}
          handlePageChange={(e, value) => handlePageChange(e, value)}
        />
      </Container>
    </div>
  );
};
export default withAxios(MyClass);
