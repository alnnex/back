const express = require("express");
const {
  createInquery,
  fetchAllInqueries,
  replyInquiry,
  fetchInqueriesByUser,
  editInquiries,
  deleteInquiry,
} = require("../controllers/inquiriesController");

const router = express.Router();

router.route("/").post(createInquery).get(fetchAllInqueries).put(editInquiries);
router.route("/:id").put(replyInquiry).get(fetchInqueriesByUser);
router.route("/deleteInquiry").post(deleteInquiry);

module.exports = router;
