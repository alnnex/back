const mongoose = require("mongoose");

const professorSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dean: { type: Boolean },
    coordinator: { type: Boolean },
    title: { type: String },
    pic: { type: String },
    subject: { type: String },
  },
  { timestamps: true }
);
const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
