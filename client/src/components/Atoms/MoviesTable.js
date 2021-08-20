import React from "react";
import PropTypes from "prop-types";

import { DataGrid } from "@material-ui/data-grid";
import { makeStyles, Paper } from "@material-ui/core";
import Title from "../Atoms/Title";

const useStyles = makeStyles({
  paper: {
    marginTop: "2rem",
    padding: "1rem",
  },
  dataGrid: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    // color: "white",
    height: 48,
    padding: "0 30px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});

const columns = [
  {
    field: "title",
    headerName: "Title",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 400,
    flex: 4,
  },
  { field: "year", headerName: "Year", minWidth: 120, flex: 1 },
];

function MoviesTable({ movies, fileName }) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      {fileName && <Title>{`File: "${fileName}"`}</Title>}
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rows={movies?.map((movie, index) => {
          return { ...movie, id: index };
        })}
        className={classes.dataGrid}
      />
    </Paper>
  );
}

MoviesTable.propTypes = {
  fileName: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default MoviesTable;
