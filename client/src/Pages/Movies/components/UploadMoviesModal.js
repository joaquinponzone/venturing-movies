import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Papa from "papaparse";
import { makeStyles, Typography } from "@material-ui/core";
import Controls from "../../../Components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function UploadMoviesModal({
  openModal,
  setOpenModal,
  setNotify,
}) {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [fileName, setFileName] = useState("");

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
          setFileName(files[0].name);
        },
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/movies/upload`, movies)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: `Movies Added Successfully`,
          type: "success",
        });
        setOpenModal({ ...openModal, upload: false });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={classes.root}>
      <Typography variant="h6">
        Select a csv file with Title, Description and Year for movies details
      </Typography>

      <Typography variant="body">File to upload: "{fileName}"</Typography>

      <div>
        {movies.length > 1 ? (
          <Controls.Button
            type="submit"
            onSubmit={handleSubmit}
            variant="contained"
            text="Upload movies"
          />
        ) : (
          <Controls.Input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleUpload}
            hidden
          />
        )}
      </div>
    </form>
  );
}
