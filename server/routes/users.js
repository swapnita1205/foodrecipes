import express from "express";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
const usersrouter = express.Router();

usersrouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (_err, user) => {
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = user.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25000000),
          httpOnly: true,
        });
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "Invalid info!" });
    }
  });
});

usersrouter.post("/register", async (req, res) => {
  var { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

usersrouter.post("/deactivate", (req, res) => {
  const { _id } = req.body;
  User.find({ _id: _id }, async (_err, user) => {
    if (user) {
      await User.deleteOne({ _id: _id });
      res.send({ message: "Successfully Deleted" });
    } else {
      res.send({ message: "There was some error!" });
    }
  });
});

usersrouter.post("/logout", async (req, res) => {
  const { _id } = req.body;
  await User.updateOne({ _id: _id }, { $set: { token: "" } });
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

export default usersrouter;
