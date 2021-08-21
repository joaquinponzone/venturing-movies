const { Router } = require("express");

// Importar todos los routers;
const router = Router();

// Configurar los routers
const {
  getMovies,
  uploadMovies,
  addMovie,
  editMovie,
} = require("../controllers/movies.controllers");

router.get("/movies", getMovies);
router.post("/upload", uploadMovies);
router.post("/add", addMovie);
router.put("/edit", editMovie);

module.exports = router;
