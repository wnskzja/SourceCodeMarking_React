import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { withAxios } from "../../axios/index";
import { CLASS_TYPE } from "../../constant/class";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    "&:hover": {
      cursor: "pointer",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Class = ({ axios, infoClass, type }) => {
  const classes = useStyles();
  const enrollClass = () => {
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post(`classes/${infoClass.id}/enroll`, {
        headers: header,
      })
      .then((response) => {
        console.log("enrollClass -> response", response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };
  const renderClass = () => {
    switch (type) {
      case CLASS_TYPE.CLASS_STORE:
        return (
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {infoClass.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                GV: {infoClass.teachers[0].name}
              </Typography>
              <Typography variant="body2" component="p">
                Mô tả: {infoClass.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={enrollClass}>
                Enroll
              </Button>
            </CardActions>
          </Card>
        );
      case CLASS_TYPE.STUDENT_CLASS:
        return (
          <Link href={`/student/class/${infoClass.id}`} underline="none">
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {infoClass.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  GV: {infoClass.teachers[0].name}
                </Typography>
                <Typography variant="body2" component="p">
                  Mô tả: {infoClass.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      case CLASS_TYPE.TEACHER_CLASS:
        return (
          <Link href={`/teacher/class/${infoClass.id}`} underline="none">
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {infoClass.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  GV: {infoClass.teachers[0].name}
                </Typography>
                <Typography variant="body2" component="p">
                  Mô tả: {infoClass.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      default:
        break;
    }
  };
  return (
    <Grid xs={4} item>
      {renderClass()}
    </Grid>
  );
};
export default withAxios(Class);
