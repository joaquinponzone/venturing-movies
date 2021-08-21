import axios from "axios";

export const getMovies = async () => {
  await axios.get(`http://localhost:3001/movies`);
};
