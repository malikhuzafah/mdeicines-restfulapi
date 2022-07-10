const express = require("express");
let router = express.Router();
let { User } = require("../../models/user");
let bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given email already exists");
  user = new User();
  const salt = await bcrypt.genSalt(10);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  let dataToReturn = {
    name: user.name,
    email: user.email,
    token: token,
  };
  return res.send(dataToReturn);
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  console.log("user" + user);
  if (!user) return res.status(400).send("User not registered");
  console.log("user exists");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  console.log(isValid);
  if (!isValid) return res.status(401).send("Invalid Password");
  console.log("valid password");
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.get("jwtPrivateKey")
  );
  console.log(user.role);
  res.send(token);
});

module.exports = router;
