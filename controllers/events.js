import Event from "../models/events.js";
import mongoose from "mongoose";
import { getAll } from "../utils/query.js";

export const getAllEvents = async (req, res) => {
  const events = await getAll(Event, req.query);
  if (!events.message) res.status(200).json({ events });
  else
    res.status(400).json({
      message: events.message,
    });
};

export const getEvent = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No event with that id");

  try {
    const event = await Event.findById(_id)
      .populate({
        path: "program",
        select: "name abbreviation",
      })
      .populate({
        path: "students",
        select: "firstName lastName schoolLevel",
      });
    res.status(201).json(event);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const doEvent = async (req, res) => {
  const event = req.body;
  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No event with that id");

  const event = { ...req.body };
  const updatedEvent = await Event.findByIdAndUpdate(_id, event, {
    new: true,
  });
  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No event with that id");

  const result = await Event.findByIdAndRemove(_id);
  if (!result) return res.status(404).send("No event with that id");

  res.json({ message: "event deleted succesfully" });
};

export const deleteAllEvents = async (req, res) => {
  await Event.remove({});
  res.json({ message: "All events deleted succesfully" });
};
