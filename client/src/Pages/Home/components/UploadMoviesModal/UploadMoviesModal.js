import React from "react";
import axios from "axios";
import { useState } from "react";
import Papa from "papaparse";
import {
  makeStyles,
  Paper,
  Button,
  Modal,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: "6rem 2rem",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "920px",
  },
  paper: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    margin: "1rem",
    padding: "1rem 2rem",
  },
});

export default function UploadMoviesModal({ open, setOpen }) {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const handleUpload = (e) => {
    const files = e.target.files;
    files &&
      Papa.parse(files[0], {
        complete: function (results) {
          let movies = results.data.map((movie) => {
            return {
              title: movie[0],
              description: movie[1],
              year: movie[2],
            };
          });
          setMovies(movies);
        },
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/upload`, movies)
      .then((res) => {
        setOpen({ ...open, addMovie: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal open={open}>
        <>
          <Paper elevation={3} className={classes.paper}>
            {/* <Typography>Import your CSV list</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleUpload} />
          <input type="submit" />
        </form> */}

            <form
              onSubmit={(e) => handleSubmit(e)}
              style={{ width: "%100", minWidth: 200 }}
            >
              <Typography subtitle={2}>
                Select a csv file with Title, Description and Year for movies
                details
              </Typography>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                component="label"
                className={classes.buttons}
              >
                Upload File
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleUpload}
                  hidden
                />
              </Button>
              <Button
                type="submit"
                onSubmit={handleSubmit}
                variant="contained"
                className={classes.buttons}
              >
                Save movies
              </Button>
            </form>
          </Paper>
        </>
      </Modal>
    </div>
  );
}
