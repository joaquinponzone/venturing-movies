import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, makeStyles, Paper } from "@material-ui/core";
import MoviesTable from "./components/MoviesTable";
import AddMovieModal from "./components/AddMovieModal/AddMovieModal";
import UploadMoviesModal from "../Movies/components/UploadMoviesModal";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    minWidth: 275,
  },
});

export function Home({ search }) {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [open, setOpen] = useState({ addMovie: false, uploadMovies: false });

  useEffect(() => {}, [page, pageSize, search, open]);

  return (
    <>
      <Paper className={classes.root}>
        <Button
          children={"Add Movie"}
          onClick={() => {
            setOpen({ ...open, addMovie: true });
          }}
        />
        <Button
          children={"Upload Movies"}
          onClick={() => {
            setOpen({ ...open, uploadMovies: true });
          }}
        />
        <AddMovieModal open={open.addMovie} setOpen={setOpen} />
        <UploadMoviesModal open={open.uploadMovies} setOpen={setOpen} />
      </Paper>

      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <MoviesTable
            movies={movies}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </Paper>
    </>
  );
}
