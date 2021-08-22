import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Paper, TextField, makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    width: "%100",
    minWidth: 275,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
});

export default function AddMovieModal({ open, setOpen }) {
  const classes = useStyles();
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
      .post(`http://localhost:3001/add`, newMovie)
      .then((res) => {
        setOpen({ ...open, addMovie: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal open={open}>
        <>
          <Paper className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                name="title"
                onChange={(e) => handleChange(e)}
                required
                label="Title"
              />
              <TextField
                multiline
                maxRows={8}
                name="description"
                onChange={(e) => handleChange(e)}
                label="Description"
              />
              <TextField
                name="year"
                onChange={(e) => handleChange(e)}
                error={newMovie.year < 1888}
                type="number"
                label="Year"
              />
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </form>
          </Paper>
        </>
      </Modal>
    </div>
  );
}
