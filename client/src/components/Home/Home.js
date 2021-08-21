import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Paper } from "@material-ui/core";
import MoviesTable from "../Atoms/MoviesTable";
import SearchMovies from "../Atoms/SearchMovies";
import { getMovies } from "../../services/moviesServices";

const useStyles = makeStyles({
  root: {
    margin: "6rem 2rem",
    minWidth: 275,
  },
});

export default function Home() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const baseURL = `http://localhost:3001/movies?page=${page}&limit=${pageSize}${
      search && `&search=${search}`
    }`;
    axios.get(baseURL).then((response) => {
      console.log(response.data);
      let moviesFetched = response.data;
      setMovies(moviesFetched);
    });
  }, [page, pageSize, search]);

  return (
    <>
      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <SearchMovies setSearch={setSearch} />
        </div>
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
