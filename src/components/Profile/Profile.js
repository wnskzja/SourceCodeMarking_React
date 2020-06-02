import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import { withAxios } from "../../axios/index";
import "./Profile.scss";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const Profile = ({ axios }) => {
  const [profile, setProfile] = useState({});
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("users/profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [axios]);
  return (
    <div className="Profile">
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl">
        <Grid container={true}>
          <Grid item xs={12}>
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
    </div>
  );
};
export default withAxios(Profile);
