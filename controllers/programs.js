import Program from "../models/programs.js";
import mongoose from "mongoose";
import { getAll } from "../utils/query.js";

export const getAllPrograms = async (req, res) => {
  const programs = await getAll(Program, req.query);
  if (!programs.message) res.status(200).json({ programs });
  else
    res.status(400).json({
      message: programs.message,
    });
};

export const getProgram = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    const program = await Program.findById(_id);
    res.status(201).json(program);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const doProgram = async (req, res) => {
  const program = req.body;
  const newProgram = new Program(program);

  try {
    await newProgram.save();
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateProgram = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const program = { ...req.body };
  const updatedProgram = await Program.findByIdAndUpdate(_id, program, {
    new: true,
  });
  res.json(updatedProgram);
};

export const deleteProgram = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  await Program.findByIdAndRemove(_id);
  res.json({ message: "program deleted succesfully" });
};
