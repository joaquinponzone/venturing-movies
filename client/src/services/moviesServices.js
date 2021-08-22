import axios from "axios";

export const getMovies = async (URL, options) => {
  await axios.get(URL, options);
};
