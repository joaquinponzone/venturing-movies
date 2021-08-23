const { Movie } = require("../db");

const getMovie = async (req, res) => {
  console.log(req.body);
  try {
    let movie = await Movie.findOne({
      where: {
        id: `${req.body.id}`,
      },
    });
    res.send(movie);
  } catch (error) {
    console.log(error);
  }
};

const addMovie = async (req, res) => {
  try {
    let newMovie = await Movie.create(req.body);
    res.send(newMovie);
  } catch (error) {
    res.status(400).send(console.log(error));
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

const deleteMovie = async (req, res) => {
  try {
    // Erease movie from DB
    await Movie.destroy({
      where: {
        id: req.body.id,
      },
    });
  } catch (err) {
    res.status(400).send(console.log(err));
  }
};

module.exports = {
  getMovie,
  addMovie,
  editMovie,
  deleteMovie,
};
