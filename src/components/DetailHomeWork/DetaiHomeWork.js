import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const DetailHomeWork = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid xs={12} item container>
        <Grid item xs={8}>
          <Paper elevation={0}>
            <h2>BTCN - Chơi Đồ</h2>
            <p>Chơi 2kg đồ</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardContent>
              <h3>Bài Nộp</h3>
              <p>Thêm sau</p>
            </CardContent>
            <CardActions>
              <Button size="small" fullWidth color="primary">
                Chọn file
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailHomeWork;
