import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";

import "./Profile.scss";
const useStyles = makeStyles({
  root: {
    minWidth: 650,
  },
});
const Profile = () => {
  return (
    <Container maxWidth="xl" className="Profile">
      <Grid container>
        <Grid xs={3}>
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
        <Grid xs={9}>
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
                    <Grid xs={4}>
                      <p className="title_info">Tên</p>
                    </Grid>
                    <Grid xs={8}>
                      <p>Lu Cu Phi</p>
                    </Grid>
                  </Grid>
                </div>
              </Link>

              <div className="birthday">
                <Grid container>
                  <Grid xs={4}>
                    <p className="title_info">Ngày sinh</p>
                  </Grid>
                  <Grid xs={8}>
                    <p>13/13/1998</p>
                  </Grid>
                </Grid>
              </div>
              <div className="sex">
                <Grid container>
                  <Grid xs={4}>
                    <p className="title_info">Giới tính</p>
                  </Grid>
                  <Grid xs={8}>
                    <p>Lưỡng tính</p>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="contact">
              <h4>Liên hệ</h4>
              <div className="email">
                <Grid container>
                  <Grid xs={4}>
                    <p className="title_info">Email</p>
                  </Grid>
                  <Grid xs={8}>
                    <p>lucuphi@gmail.com</p>
                  </Grid>
                </Grid>
              </div>
              <div className="sdt">
                <Grid container>
                  <Grid xs={4}>
                    <p className="title_info">Số điện thoại</p>
                  </Grid>
                  <Grid xs={8}>
                    <p>0965667098</p>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profile;
