import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Paper } from "@material-ui/core";
import MoviesTable from "../Atoms/MoviesTable";
import SearchMovies from "../Atoms/SearchMovies";

const baseURL = "http://localhost:3001";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    minWidth: 275,
  },
  dataGrid: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});

export default function Home() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      let moviesFetched = response.data;
      setMovies(moviesFetched);
    });
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <SearchMovies />
        </div>
      </Paper>
      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <MoviesTable movies={movies} />
        </div>
      </Paper>
    </>
  );
}
