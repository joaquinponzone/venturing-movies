import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, makeStyles, Paper } from "@material-ui/core";
import MoviesTable from "../../Components/MoviesTable";
import SearchMovies from "../../Components/SearchMovies";
import AddMovieModal from "./components/AddMovieModal/AddMovieModal";
import UploadMoviesModal from "./components/UploadMoviesModal/UploadMoviesModal";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    minWidth: 275,
  },
});

export function Home() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState({ addMovie: false, uploadMovies: false });

  useEffect(() => {
    const baseURL = `http://localhost:3001/movies?page=${page}&limit=${pageSize}${
      search && `&search=${search}`
    }`;
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      let moviesFetched = response.data;
      setMovies(moviesFetched);
    });
  }, [page, pageSize, search, open]);

  return (
    <>
      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <SearchMovies setSearch={setSearch} />
        </div>
      </Paper>

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
