const express = require("express");
const {
  findFilePerProgram,
  createFile,
  deleteFile,
} = require("../controllers/filesController");

const router = express.Router();

router.route("/:programId").get(findFilePerProgram);
router.route("/").post(createFile).put(deleteFile);

module.exports = router;
