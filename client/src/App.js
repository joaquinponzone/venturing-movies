import "./App.css";
import Papa from "papaparse";
import { useState } from "react";

function App() {
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
          console.log(movies);
          setMovies(movies);
        },
      });
  };

  const saveMovies = async (movies) => {
    const rawResponse = await fetch("http://localhost:3001/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movies),
    });
    const content = await rawResponse.json();
    alert(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveMovies(movies);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Import your CSV list</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="file" accept=".csv,.xlsx,.xls" onChange={handleUpload} />
          <input type="submit" />
        </form>
        <div>
          {movies?.map((movie) => {
            return (
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <h4>{movie.year}</h4>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
