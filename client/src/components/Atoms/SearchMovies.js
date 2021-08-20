import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, makeStyles, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles({
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
});

function SearchMovies({ movies, setMovies }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
    // setMovies(movies.filter(movie => movie.title == search))
  }, [search]);

  return (
    <Paper elevation={3} className={classes.paper}>
      <div style={{ width: 300 }}>
        <Input />
        <Button onClick={setMovies()}>Search</Button>
      </div>
    </Paper>
  );
}

SearchMovies.propTypes = { movies: PropTypes.arrayOf(PropTypes.object) };

export default SearchMovies;
