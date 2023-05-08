const express = require("express");
const {
  createNewsEvents,
  fetchNewsEvents,
  specificNewsEvents,
  EditNewsAndEvents,
  deleteNewsEvents,
} = require("../controllers/newsEventsController");

const router = express.Router();

router
  .route("/")
  .post(createNewsEvents)
  .get(fetchNewsEvents)
  .put(deleteNewsEvents);
router.route("/:id").get(specificNewsEvents).put(EditNewsAndEvents);

module.exports = router;
