import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Navigation from "../Navigation/Navigation";
import Loading from "../Loading/Loading";
import { withAxios } from "../../axios/index";
import Pagination from "../Pagination/Pagination";
import { GlobalContext } from "../../ReactContext/ReactContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    width: "70%",
  },
  item: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 0,
    paddingTop: 0,
  },
  isRead: {
    backgroundColor: "#E5EAF2",
  },
}));

const Notifications = ({ axios }) => {
  const classes = useStyles();
  const [listNoti, setListNoti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalNoti, setTotalNoti] = useState(0);
  const history = useHistory();
  const { setIsReadNoti } = useContext(GlobalContext);
  const pageSize = 12;

  useEffect(() => {
    localStorage.setItem("title", "Thông Báo");
    const params = {
      params: {
        order_type: "ASC",
        page_token: activePage,
        page_size: pageSize,
      },
    };
    axios
      .get(`notifications`, params)
      .then((response) => {
        setListNoti(response.data.notifications);
        setTotalNoti(response.data.total_records);
        setIsLoading(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [activePage, axios]);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  const clickNoti = (id, idEx) => {
    axios
      .patch(`notifications/${id}`)
      .then((response) => {
        setIsReadNoti(id);
        history.push(`/student/exercise/${idEx}`);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  return (
    <div className={classes.root}>
      <Navigation />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          {totalNoti > 0 ? (
            <Container maxWidth="md" className={classes.container}>
              <h3 style={{ textAlign: "center" }}>Thông báo của bạn</h3>
              <List component="nav" className={classes.item}>
                {listNoti &&
                  listNoti.map((item) => (
                    <div key={item.id}>
                      <ListItem
                        button
                        className={item.is_read ? "" : classes.isRead}
                        onClick={() => clickNoti(item.id, item.exercise_id)}
                      >
                        <ListItemText primary={item.content} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
              </List>
              <Pagination
                activePage={activePage}
                itemPerPage={pageSize}
                totalItems={totalNoti}
                handlePageChange={handlePageChange}
              />
            </Container>
          ) : (
            <h3>Không có thông báo</h3>
          )}
        </div>
      )}
    </div>
  );
};
export default withAxios(Notifications);
