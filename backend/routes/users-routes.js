const express = require("express");
const { check } = require("express-validator");

const {
  getAllUsers,
  signup,
  login,
} = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", getAllUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

router.post("/login", login);

module.exports = router;
