const asyncHandler = require("../middleware/async");
const User = require("../models/user");

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({
    success: true,
    model: users,
  });
});

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    model: user,
  });
});

// @desc      Create user
// @route     POST /api/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    model: user,
  });
});

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    model: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    model: {},
  });
});

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const UserModal = require("../models/user");

// const secret = "test";

// const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (!oldUser)
//       return res.status(404).json({ message: "User doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ result: oldUser, token });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const signup = async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (oldUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await UserModal.create({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     const token = jwt.sign({ email: result.email, id: result._id }, secret, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });

//     console.log(error);
//   }
// };
// module.exports = {
//   signin,
//   signup,
// };
