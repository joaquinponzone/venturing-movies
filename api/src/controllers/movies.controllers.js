const { Movie } = require("../db");
const { Op } = require("sequelize");

const getMovies = async (req, res) => {
  console.log(req.query);
  //Pagination
  const page = req.query.page;
  const limit = req.query.limit;
  const searchQuery = req.query.search;
  const startIndex = ((page - 1) * limit) | 0;
  const endIndex = page * limit;
  try {
    // DB Search
    const searchDB = !searchQuery
      ? await Movie.findAll()
      : await Movie.findAll({
          where: {
            title: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
        });
    // Response
    let responseData = !searchQuery
      ? searchDB?.slice(startIndex, endIndex)
      : searchDB;
    res.send({
      count: searchDB.length,
      pages: searchDB.length > limit ? Math.ceil(searchDB.length / limit) : 1,
      movies: responseData,
    });
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

const uploadMovies = async (req, res) => {
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
  uploadMovies,
};
