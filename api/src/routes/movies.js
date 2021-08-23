const { Router } = require("express");
const router = Router();

const {
  getMovies,
  uploadMovies,
} = require("../controllers/movies.controllers");

router.get("/", getMovies);
router.post("/upload", uploadMovies);

module.exports = router;
