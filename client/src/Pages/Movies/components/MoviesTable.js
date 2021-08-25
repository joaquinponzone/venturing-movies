import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import Controls from "../../../Components/controls/Controls";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: theme.palette.selection.main,
      cursor: "pointer",
    },
  },
}));

export default function MoviesTable({
  movies,
  headCells,
  openModal,
  openActionModal,
}) {
  const classes = useStyles();
  return (
    <div>
      <Grid item sm={12}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movies?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openActionModal(item, "view");
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openActionModal(item, "edit");
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      openActionModal(item, "delete");
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
}
