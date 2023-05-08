const express = require("express");
const {
  createProgram,
  fetchPrograms,
  specificProgram,
  deletePrograms,
  editProgram,
} = require("../controllers/programController");

const router = express.Router();

router.route("/").post(createProgram).get(fetchPrograms).put(deletePrograms);
router.route("/updateProgram").put(editProgram);
router.route("/:id").get(specificProgram);

module.exports = router;
