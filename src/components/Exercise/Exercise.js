import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function createData(name, nameClass, dateRes) {
  return { name, nameClass, dateRes };
}

const rows = [createData("CuShiNo", "Web nâng cao", "16 Mar, 2020")];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Danh sách nộp
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow key={1}>
              <TableCell>Họ Tên</TableCell>
              <TableCell>Tên file</TableCell>
              <TableCell>Ngày nộp</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.nameClass}</TableCell>
                <TableCell>{row.dateRes}</TableCell>
                <TableCell align="right">
                  <Button>Chấm bài</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </Grid>
  );
}
