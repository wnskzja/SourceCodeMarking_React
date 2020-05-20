import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import { withAxios } from "../../axios/index";
import { useHistory } from "react-router-dom";
import "./Profile.scss";

const Profile = ({ axios }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    history.push("/signin");
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    axios
      .get("/profile")
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        handleOpen();
      })
      .finally(() => {});
  }, [axios, history]);
  return (
    <div>
      {!isLoading ? (
        <Container maxWidth="xl" className="Profile">
          <Grid container={true}>
            <Grid item xs={3} container>
              <div className="menu">
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button className="active">
                    <ListItemIcon>
                      <ContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thông tin cá nhân" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item xs={9}>
              <Container maxWidth="md">
                <Typography
                  variant="h4"
                  align="center"
                  component="h2"
                  className="title"
                >
                  Thông tin cá nhân
                </Typography>
                <div className="information">
                  <h4>Hồ Sơ</h4>
                  <Link to="">
                    <div className="name line">
                      <Grid container>
                        <Grid item xs={4}>
                          <p className="title_info">Tên</p>
                        </Grid>
                        <Grid item xs={8}>
                          <p>{profile.name}</p>
                        </Grid>
                      </Grid>
                    </div>
                  </Link>

                  <div className="birthday">
                    <Grid container>
                      <Grid item xs={4}>
                        <p className="title_info">Ngày sinh</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p>13/3/1998</p>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="sex">
                    <Grid container>
                      <Grid item xs={4}>
                        <p className="title_info">Giới tính</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p>Nam</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div className="contact">
                  <h4>Liên hệ</h4>
                  <div className="email">
                    <Grid container>
                      <Grid item xs={4}>
                        <p className="title_info">Email</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p>{profile.email}</p>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="sdt">
                    <Grid container>
                      <Grid item xs={4}>
                        <p className="title_info">Số điện thoại</p>
                      </Grid>
                      <Grid item xs={8}>
                        <p>0965667098</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Container>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="secondary">
              Bạn chưa đăng nhập !!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Đăng nhập
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default withAxios(Profile);
