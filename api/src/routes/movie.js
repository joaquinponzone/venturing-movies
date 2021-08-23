const { Router } = require("express");
const router = Router();

const {
  getMovie,
  addMovie,
  editMovie,
  deleteMovie,
} = require("../controllers/movie.controllers");

router.get("/get", getMovie);
router.post("/add", addMovie);
router.put("/edit", editMovie);
router.delete("/delete", deleteMovie);

module.exports = router;
