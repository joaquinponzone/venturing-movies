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
  const [movieToDelete] = useState(openModal.itemForDelete);

  const handleDelete = () => {
    axios
      .delete("http://localhost:3001/movie/delete", { data: movieToDelete })
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "success",
        });
        setOpenModal({ ...openModal, delete: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={() => handleDelete()}
    >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            <Box textAlign="center" m={1}>
              <WarningIcon fontSize="large" color="secondary" />
            </Box>
            <Box textAlign="center" m={1}>
              Sure you want to delete {movieToDelete.title}?
            </Box>
          </Typography>
        </Grid>
        <Grid item>
          <Controls.Button
            text="Cancel"
            variant="outlined"
            onClick={() => setOpenModal({ ...openModal, delete: false })}
          />
          <Controls.Button
            text="Delete"
            variant="outlined"
            type="submit"
            color="secondary"
          />
        </Grid>
      </Grid>
    </form>
  );
}
