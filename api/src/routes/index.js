const { Router } = require("express");
const router = Router();
const movies = require("./movies");
const movie = require("./movie");

// Configurar los routers

router.use("/movies", movies);
router.use("/movie", movie);

module.exports = router;
