const asyncHandler = require("express-async-handler");
const Professor = require("../models/professorModel");

const addProfessor = asyncHandler(async (req, res) => {
  const { firstName, lastName, title, pic, dean, coordinator, subject } =
    req.body;

  const professorToAdd = await Professor.create({
    firstName,
    lastName,
    title,
    pic,
    dean,
    coordinator,
    subject,
  });

  if (professorToAdd) {
    res.status(201).json({
      firstName: professorToAdd.firstName,
      lastName: professorToAdd.lastName,
      title: professorToAdd.title,
      pic: professorToAdd.pic,
      dean: professorToAdd.dean,
      coordinator: professorToAdd.coordinator,
      subject: professorToAdd.subject,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the professor!");
  }
});

const fetchProfessor = asyncHandler(async (req, res) => {
  try {
    const professor = await Professor.find().sort({
      dean: -1,
      coordinator: -1,
      lastName: 1,
      firstName: 1,
    });
    res.json(professor);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const editProfessor = asyncHandler(async (req, res) => {
  const { id, firstName, lastName, title, pic, dean, coordinator, subject } =
    req.body;
  try {
    await Professor.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      title: title,
      pic: pic,
      dean: dean,
      coordinator: coordinator,
      subject: subject,
    });
    res.status(200).json({
      _id: id,
      firstName: firstName,
      lastName: lastName,
      title: title,
      pic: pic,
      dean: dean,
      coordinator: coordinator,
      subject: subject,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

const deleteProfessor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const professorToDelete = await Professor.deleteOne({ _id: id });
    res.status(201).json(professorToDelete);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  addProfessor,
  fetchProfessor,
  deleteProfessor,
  editProfessor,
};
