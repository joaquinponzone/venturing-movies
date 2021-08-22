import React from "react";
import PropTypes from "prop-types";
import { Button, Input, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
});

function SearchMovies({ setSearch }) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <div style={{ width: 300 }}>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button onClick={(e) => {}}>Search</Button>
      </div>
    </Paper>
  );
}

SearchMovies.propTypes = { movies: PropTypes.arrayOf(PropTypes.object) };

export default SearchMovies;
