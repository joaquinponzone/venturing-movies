import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Controls from "../../../Components/controls/Controls";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function AddMovieForm({ openModal, setOpenModal, setNotify }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    year: 0,
  });
  const handleChange = (event) => {
    setNewMovie({ ...newMovie, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/movie/add`, newMovie)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: `${res.data.title} Added Successfully`,
          type: "success",
        });
        setOpenModal({ ...openModal, add: false });
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
      });
  };

  return (
    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="title"
            onChange={(e) => handleChange(e)}
            required
            label="Title"
          />
          <Controls.Input
            multiline
            maxRows={8}
            name="description"
            onChange={(e) => handleChange(e)}
            label="Description"
          />
          <Controls.Input
            name="year"
            onChange={(e) => handleChange(e)}
            error={newMovie.year < 1888}
            type="number"
            label="Year"
          />
          <Button type="submit">Submit</Button>
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
              <Typography variant="h6">Title already exists!</Typography>
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </form>
  );
}
