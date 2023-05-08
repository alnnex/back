const mongoose = require("mongoose");

const NewsEventsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    pic: { type: String },
  },
  { timestamps: true }
);

const NewsEvents = mongoose.model("NewsEvents", NewsEventsSchema);

module.exports = NewsEvents;
