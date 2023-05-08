const mongoose = require("mongoose");

const programSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    years: { type: String, required: true },
    pic: { type: String },
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
