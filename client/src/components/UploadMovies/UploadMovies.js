import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Papa from "papaparse";
import { makeStyles, Paper, Button } from "@material-ui/core";
import MoviesTable from "../Atoms/MoviesTable";
import Title from "../Atoms/Title";

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

const baseURL = "http://localhost:3001/upload";

const saveMovies = async (movies) => {
  const rawResponse = await fetch(baseURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movies),
  });
  const content = await rawResponse.json();
  console.log(content);
  // // Redirect("/");

  // axios.post(baseURL, movies).then((response) => {
  //   console.log(response.data);
  // });
};

function UploadMovies() {
  const classes = useStyles();
  const history = useHistory();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveMovies(movies);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
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
            <Title subtitle={2}>
              Select a csv file with Title, Description and Year for movies
              details
            </Title>
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
              variant="contained"
              className={classes.buttons}
            >
              Save movies
            </Button>
          </form>
        </Paper>

        <MoviesTable
          movies={movies.map((movie, index) => {
            return { ...movie, id: index };
          })}
          fileName={fileName}
        />
      </div>
    </div>
  );
}

export default UploadMovies;
