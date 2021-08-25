import { Box, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Controls from "../../../Components/controls/Controls";
import axios from "axios";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function EditMovieModal({ openModal, setOpenModal, setNotify }) {
  const classes = useStyles();

  const handleDelete = async (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3001/movie/delete`, { data: openModal.item })
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
        setOpenModal({ ...openModal, delete: false, item: null });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            <Box textAlign="center" m={1}>
              <WarningIcon fontSize="large" color="secondary" />
            </Box>
            <Box textAlign="center" m={1}>
              Sure you want to delete {openModal.item?.title}?
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Controls.Button
            text="Cancel"
            variant="outlined"
            onClick={() =>
              setOpenModal({ ...openModal, delete: false, item: null })
            }
          />
          <Controls.Button
            text="Delete"
            variant="outlined"
            // type="submit"
            color="secondary"
            onClick={(e) => {
              handleDelete(e);
              setOpenModal({ ...openModal, delete: false, item: null });
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
