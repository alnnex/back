const asyncHandler = require("express-async-handler");
const Inquiries = require("../models/inquiriesModel");
var ObjectId = require("mongoose").Types.ObjectId;

const createInquery = asyncHandler(async (req, res) => {
  const { senderId, inquiry, subject } = req.body;

  const InquiryForm = {
    inquiry: inquiry,
    subject: subject,
    sender: new ObjectId(senderId),
  };

  if (!inquiry || !subject) {
    res.status(400);
    throw new Error("Fill in all fields");
  }
  try {
    const newInquiry = await Inquiries.create(InquiryForm);
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to create Inquery");
  }
});

const fetchAllInqueries = asyncHandler(async (req, res) => {
  try {
    const fetchAll = await Inquiries.find()
      .populate("sender", "-password")
      .sort({ replied: 1, createdAt: 1 });
    res.status(200).json(fetchAll);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to fetch all Inquery");
  }
});
const fetchInqueriesByUser = asyncHandler(async (req, res) => {
  try {
    const fetchAll = await Inquiries.find({ sender: req.params.id })
      .populate("sender", "-password")
      .sort({ replied: -1 });
    res.status(200).json(fetchAll);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to fetch all Inquery");
  }
});

const replyInquiry = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  if (!reply) {
    res.status(400);
    throw new Error("Fill in all fields");
  }

  try {
    const updateReply = await Inquiries.findByIdAndUpdate(req.params.id, {
      reply: reply,
      replied: true,
    }).populate("sender", "-password");
    res.status(200).json({
      _id: updateReply._id,
      inquiry: updateReply.inquiry,
      subject: updateReply.subject,
      sender: updateReply.sender,
      reply: reply,
      replied: true,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to send reply");
  }
});

const editInquiries = asyncHandler(async (req, res) => {
  const { subject, inquiry, sender, inquiryId } = req.body;

  try {
    const editedInquiry = await Inquiries.findByIdAndUpdate(inquiryId, {
      subject: subject,
      inquiry: inquiry,
      replied: false,
      sender: sender,
    });
    res.status(200).json(editedInquiry);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to update inquiry");
  }
});

const deleteInquiry = asyncHandler(async (req, res) => {
  const { inquiryId } = req.body;

  try {
    const deleteInquiry = await Inquiries.findOne({ _id: inquiryId });
    res.status(200).json(deleteInquiry);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to delete inquiry");
  }
});
module.exports = {
  createInquery,
  fetchAllInqueries,
  replyInquiry,
  fetchInqueriesByUser,
  editInquiries,
  deleteInquiry,
};
