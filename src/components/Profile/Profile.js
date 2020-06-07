import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withAxios } from "../../axios/index";
import "./Profile.scss";
import Loading from "../Loading/Loading";
import Alert from "../Alert/Alert";
import { ALERT_TYPE } from "../../constant/alert";

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
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    localStorage.setItem("title", "Thông Tin");
    axios
      .get("users/profile")
      .then((response) => {
        setProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [axios]);

  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setName(e.target.value);
  };
  const updateProfile = () => {
    if (name) {
      axios
        .put(`/users/${profile.id}`, { name: name })
        .then((response) => {
          if (response.status === 200) {
            setMessage("");
            setMessage("Cập nhật thành công");
            profile.name = name;
            setTypeAlert(ALERT_TYPE.SUCCESS);
          }
        })
        .catch((error) => {
          setMessage("");
          setMessage("Cập nhật thât bại");
          setTypeAlert(ALERT_TYPE.ERROR);
        })
        .finally(() => {
          setOpen(false);
        });
    } else {
      setErrorText("Vui lòng không bỏ trống");
    }
  };
  return (
    <div className="Profile">
      <div className={classes.appBarSpacer} />
      {isLoading ? (
        <Loading />
      ) : (
        <Container maxWidth="xl">
          <Alert message={message} type={typeAlert} />
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
                <Grid className="updateInfo" container>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Cập nhật thông tin
                  </Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Cập nhật thông tin</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Họ Tên"
                type="text"
                defaultValue={profile?.name}
                error={Boolean(errorText)}
                helperText={errorText}
                onChange={onChange}
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="email"
                value={profile?.email}
                disabled={true}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Hủy
              </Button>
              <Button
                onClick={updateProfile}
                variant="contained"
                color="primary"
              >
                Cập nhật
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </div>
  );
};
export default withAxios(Profile);
