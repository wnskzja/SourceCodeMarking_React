import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const User = ({ user }) => {
  return (
    <>
      <TableRow key={`table-row-admin-user-${user.id}`}>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {user.email}
        </TableCell>
        <TableCell scope="row" align="right">
          <IconButton aria-label="edit">
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default User;
