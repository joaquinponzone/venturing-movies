import { Button, Paper, TextField, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    width: "fit-content",
    minWidth: 275,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
});

export default function AddMovie() {
  const classes = useStyles();
  const history = useHistory();
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    year: 0,
  });

  const handleChange = (event) => {
    setNewMovie({ ...newMovie, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:3001/add`, newMovie);
    history.push("/");
  };

  return (
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
          <Button type="submit">Submit</Button>
        </form>
      </Paper>
    </>
  );
}
