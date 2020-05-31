import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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

const Class = ({ role }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid xs={4} item>
        <Link
          href={role === "TEACHER" ? "/teacher/homework" : "/student/homework"}
          underline="none"
        >
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                CSS - Web Nâng Cao
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                GV: Lu Phi Xa
              </Typography>
              <Typography variant="body2" component="p">
                Mô tả: Mọi thứ đều nâng cao
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
};
export default Class;
