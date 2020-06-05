import React, { useEffect } from "react";
import "./DialogChooseRole.scss";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { blue } from "@material-ui/core/colors";

import { useHistory } from "react-router-dom";
import { withAxios } from "../../../axios/index";

const roles = ["Teacher", "Student"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Chọn loại tài khoản</DialogTitle>
      <List>
        {roles.map((role) => (
          <ListItem button onClick={() => handleListItemClick(role)} key={role}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {role === "Teacher" ? (
                  <SupervisorAccountIcon />
                ) : (
                  <PersonIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={role} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const DialogChooseRole = ({
  isSignIn,
  handleIsisgnIn,
  dataResponseService,
  axios,
  from,
}) => {
  const history = useHistory();
  const [selectedValue, setSelectedValue] = React.useState("");

  useEffect(() => {
    setSelectedValue("");
  }, [isSignIn]);

  const handleClose = (value) => {
    handleIsisgnIn(false);
    setSelectedValue(value.toUpperCase());

    const header = {
      "Content-Type": "application/json",
    };
    const data = dataResponseService;
    data.role = value.toUpperCase();

    if (value) {
      axios
        .post("/users/signin", data, {
          headers: header,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response?.data));
          localStorage.setItem("token", response?.headers["access-token"]);
          if (from) {
            history.push(from.pathname);
          } else {
            if (response?.data.role === "STUDENT") {
              history.push("/student");
            } else if (response?.data.role === "TEACHER") {
              history.push("/teacher");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={isSignIn ? isSignIn : false}
        onClose={handleClose}
      />
    </div>
  );
};
export default withAxios(DialogChooseRole);
