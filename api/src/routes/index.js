const { Router } = require("express");

// Importar todos los routers;
const router = Router();

// Configurar los routers
const {
  getMovies,
  postNewMovies,
} = require("../controllers/movies.controllers");

router.get("/movies", getMovies);
router.post("/upload", postNewMovies);

module.exports = router;
