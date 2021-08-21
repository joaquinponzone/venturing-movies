const { Movie } = require("../db");
const { Op } = require("sequelize");

const getMovies = async (req, res) => {
  //Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 15;
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
    res.send(!searchQuery ? searchDB?.slice(startIndex, endIndex) : searchDB);
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

const addMovie = async (req, res) => {
  console.log(req.body);
  try {
    let newMovie = await Movie.create(req.body);
    res.send(newMovie);
  } catch (error) {
    res.status(400).send(console.log(err));
  }
};

const editMovie = async (req, res) => {
  const newMovie = req.body;
  try {
    // Edit movie in DB
    let movieToUpdate = await Movie.findOne({
      where: {
        id: `${newMovie.id}`,
      },
    });
    console.log(movieToUpdate);
    let updatedMovie = await movieToUpdate.update(newMovie);
    res.send(updatedMovie);
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

module.exports = {
  getMovies,
  uploadMovies,
  addMovie,
  editMovie,
};
