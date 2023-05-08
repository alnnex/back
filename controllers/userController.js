const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, admin } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all Fields!");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    firstName,
    lastName,
    // course,
    email,
    admin,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      // course: user.course,
      email: user.email,
      admin: user.admin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      // course: user.course,
      email: user.email,
      admin: user.admin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password!");
  }
});

module.exports = { registerUser, authUser };
