const { Movie } = require("../db");
const { Op } = require("sequelize");

const getMovies = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const searchQuery = req.query.search;
  const startIndex = ((page - 1) * limit) | 0;
  const endIndex = page * limit;

  try {
    //DB Search
    let options = {
      where: {
        title: { [Op.iLike]: `%${searchQuery}%` },
      },
    };
    const searchDB = !searchQuery
      ? await Movie.findAll()
      : Movie.findAll(options);

    //Response
    res.send(!searchQuery ? searchDB?.slice(startIndex, endIndex) : searchDB);
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

const postNewMovies = async (req, res) => {
  const newMoviesList = req.body;
  try {
    // Add all movies to DB
    newMoviesList.map(async (element) => {
      try {
        let newMovie = await Movie.create(element);
        console.log(newMovie);
      } catch (error) {
        console.log(error);
      }
    });
    res.send(newMoviesList);
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

module.exports = {
  getMovies,
  postNewMovies,
};
