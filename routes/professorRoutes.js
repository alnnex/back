const express = require("express");
const {
  addProfessor,
  fetchProfessor,
  deleteProfessor,
  editProfessor,
} = require("../controllers/professorController");

const router = express.Router();

router.route("/").post(addProfessor).get(fetchProfessor).put(deleteProfessor);
router.route("/updateProfessor").put(editProfessor);

module.exports = router;
