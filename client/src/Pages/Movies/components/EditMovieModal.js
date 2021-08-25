import { Grid, Snackbar, Typography } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Controls from "../../../Components/controls/Controls";
import axios from "axios";
import { Alert } from "@material-ui/lab";

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
  const [open, setOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(openModal.item);

  const handleChange = (event) => {
    setMovieToEdit({ ...movieToEdit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/movie/edit`, movieToEdit)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: `${res.data.title} Edited Successfully`,
          type: "success",
        });
        setOpenModal({ ...openModal, edit: false, item: null });
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Controls.Input
            name="title"
            onChange={(e) => handleChange(e)}
            required
            label="Title"
            defaultValue={movieToEdit.title}
          />
          <Controls.Input
            multiline
            maxRows={8}
            name="description"
            onChange={(e) => handleChange(e)}
            label="Description"
            defaultValue={movieToEdit.description}
          />
          <Controls.Input
            name="year"
            onChange={(e) => handleChange(e)}
            error={movieToEdit.year < 1888}
            type="number"
            label="Year"
            defaultValue={movieToEdit.year}
          />
        </Grid>
        <Grid item>
          <Controls.Button text="Submit" variant="outlined" type="submit" />
        </Grid>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Alert onClose={() => setOpen(false)} severity="error">
            <Typography>Title already exists!</Typography>
          </Alert>
        </Snackbar>
      </Grid>
    </form>
  );
}
