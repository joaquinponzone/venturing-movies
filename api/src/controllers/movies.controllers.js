
const { Movie } = require("../db");

const getMovies = async (req, res) => {
  try {
    const movies = [];
    //DB Search
    const search = await Movie.findAll();
    const DB_data = search.map((movie) => movie.dataValues);
    DB_data.map((movie) => movies.push(movie));

    //Response
    res.send(movies);
  } catch (err) {
    res.status(400).send(console.log(err));
  }
}

const postNewMovies = async (req, res) => {
  const newMoviesList = req.body;
  try {
    // Add all movies to DB
    newMoviesList.map(async element => {
      let newMovie = await Movie.create(element);
      console.log(newMovie)
    });
    res.send(newMoviesList);
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

module.exports = {
  getMovies,
  postNewMovies
};
