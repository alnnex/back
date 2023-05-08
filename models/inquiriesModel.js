const mongoose = require("mongoose");

const inquiriesSchema = mongoose.Schema(
  {
    subject: { type: String, required: true },
    inquiry: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reply: { type: String },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Inqueries = mongoose.model("Inquiries", inquiriesSchema);

module.exports = Inqueries;
