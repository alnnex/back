const asyncHandler = require("express-async-handler");
const File = require("../models/fileModel");
var ObjectId = require("mongoose").Types.ObjectId;

const createFile = asyncHandler(async (req, res) => {
  const { name, programId, url } = req.body;

  const newFile = {
    name: name,
    program: new ObjectId(programId),
    url: url,
  };
  try {
    var file = await File.create(newFile);

    res.json(file);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const findFilePerProgram = asyncHandler(async (req, res) => {
  try {
    const files = await File.find({
      program: new ObjectId(req.params.programId),
    });
    res.json(files);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const toDelete = await File.deleteOne({ _id: id });
    res.json(toDelete);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { createFile, findFilePerProgram, deleteFile };
