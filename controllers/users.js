import User from "../models/users.js";
import Program from "../models/programs.js";
import Event from "../models/events.js";
import mongoose from "mongoose";
import { getAll } from "../utils/query.js";

export const getAllUsers = async (req, res) => {
  const users = await getAll(User, req.query);
  if (!users.message) res.status(200).json({ users });
  else
    res.status(400).json({
      message: users.message,
    });
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  try {
    const user = await User.findById(_id)
      .populate({
        path: "programs",
        select: "_id name abbreviation duration start end",
      })
      .populate({
        path: "events",
        select: "_id name duration",
      });
    if (user.userType === "admin") {
      const teachers = await User.find({ userType: "teacher" }).select(
        "firstName lastName "
      );
      user.teachers = teachers;
    } else user.teachers = undefined;

    if (user.userType === "teacher") {
      const students = await User.find({ userType: "student" }).select(
        "firstName lastName schoolLevel events"
      );
      user.students = students;
    } else user.students = undefined;
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const doUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  const user = { ...req.body };
  const updatedUser = await User.findByIdAndUpdate(_id, user, {
    new: true,
  });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user with that id");

  const result = await User.findByIdAndRemove(_id);
  if (!result) return res.status(404).send("No user with that id");

  res.json({ message: "user deleted succesfully" });
};

export const deleteAllUsers = async (req, res) => {
  await User.remove({});
  res.json({ message: "All users deleted succesfully" });
};
