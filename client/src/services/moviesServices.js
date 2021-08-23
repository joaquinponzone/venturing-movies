import axios from "axios";

export function getAllMovies(page, pageSize, search) {
  const baseURL = `http://localhost:3001/movies?page=${page}&limit=${pageSize}${
    search && `&search=${search}`
  }`;
  let moviesFetched = [];
  axios.get(baseURL).then((response) => {
    console.log(response.data);
    moviesFetched = response.data;
  });
  return moviesFetched;
}

export function addMovie(movie) {
  axios
    .post("http://localhost:3001/editMovies", movie)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export function editMovie(movie) {
  axios
    .put("http://localhost:3001/editMovies", movie)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export function deleteMovie(movie) {
  axios
    .delete("http://localhost:3001/editMovies", movie)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
