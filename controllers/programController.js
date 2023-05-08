const asyncHandler = require("express-async-handler");
const Program = require("../models/programModel");
const File = require("../models/fileModel");
var ObjectId = require("mongoose").Types.ObjectId;

const createProgram = asyncHandler(async (req, res) => {
  const { name, description, years, pic } = req.body;

  const program = await Program.create({
    name,
    description,
    years,
    pic,
  });
  try {
    if (program) {
      res.status(201).json({
        _id: program._id,
        name: program.name,
        description: program.description,
        years: program.years,
        pic: program.pic,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the program!");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const specificProgram = asyncHandler(async (req, res) => {
  try {
    const programs = await Program.findById({ _id: req.params.id });
    res.json(programs);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const fetchPrograms = asyncHandler(async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const deletePrograms = asyncHandler(async (req, res) => {
  const { programId } = req.body;
  try {
    programToDelete = await Program.deleteOne({ _id: programId });
    fileToDelete = await File.deleteMany({ program: programId });
    res.json(fileToDelete);
    res.json(programToDelete);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const editProgram = asyncHandler(async (req, res) => {
  const { id, name, description, years, pic } = req.body;
  try {
    await Program.findByIdAndUpdate(id, {
      name: name,
      description: description,
      years: years,
      pic: pic,
    });

    res.status(200).json({
      _id: id,
      name: name,
      description: description,
      years: years,
      pic: pic,
    });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

module.exports = {
  createProgram,
  fetchPrograms,
  specificProgram,
  deletePrograms,
  editProgram,
};
