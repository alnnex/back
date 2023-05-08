const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    url: { type: String, required: true },
    // pic: { type: String },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
