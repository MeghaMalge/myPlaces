const { validationResult } = require("express-validator");

const HttpError = require("../models/Error");
const User = require("../models/user");

const USERS = [
  {
    id: "u1",
    name: "Max",
    email: "max@gmail.com",
    password: "Max@123",
    places: 2,
  },
  {
    id: "u2",
    name: "John",
    email: "john@gmail.com",
    password: "John@123",
    places: 1,
  },
  {
    id: "u3",
    name: "Linda",
    email: "linda@gmail.com",
    password: "Linda@123",
    places: 4,
  },
];

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("signup failed", 500));
  }
  if (existingUser) {
    return next(new HttpError("email already exists", 500));
  }
  const newUser = new User({
    name,
    email,
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    password,
    places: [],
  });
  console.log(newUser);
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not signup, please try again ...", 500));
  }
  res.status(201).json(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("login failed", 500));
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Invalid credentials", 401));
  }
  res.status(200).json(user);
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
