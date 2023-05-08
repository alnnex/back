const asyncHandler = require("express-async-handler");
const NewsEvents = require("../models/newsEventsModel");

const createNewsEvents = asyncHandler(async (req, res) => {
  const { title, content, date, pic } = req.body;

  const newsEventsCreated = {
    title: title,
    content: content,
    date: date,
    pic: pic,
  };

  try {
    var newsEvents = await NewsEvents.create(newsEventsCreated);
    res.json(newsEvents);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
const fetchNewsEvents = asyncHandler(async (req, res) => {
  try {
    const newsEvents = await NewsEvents.find().sort({
      date: -1,

    });;
    res.json(newsEvents);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const specificNewsEvents = asyncHandler(async (req, res) => {
  try {
    const newsEvents = await NewsEvents.findById({ _id: req.params.id });
    res.json(newsEvents);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});
const EditNewsAndEvents = asyncHandler(async (req, res) => {
  const { pic, title, content, date } = req.body;

  try {
    await NewsEvents.findByIdAndUpdate(req.params.id, {
      title: title,
      content: content,
      date: date,
      pic: pic,
    });

    res.status(200).json({
      _id: req.params.id,
      title: title,
      content: content,
      date: date,
      pic: pic,
    });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const deleteNewsEvents = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const newsEventsToDelete = await NewsEvents.deleteOne({ _id: id });
    res.status(201).json(newsEventsToDelete);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

module.exports = {
  createNewsEvents,
  fetchNewsEvents,
  specificNewsEvents,
  EditNewsAndEvents,
  deleteNewsEvents,
};
