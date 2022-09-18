import express from "express";
import {
  getAllEvents,
  getEvent,
  doEvent,
  updateEvent,
  deleteEvent,
  deleteAllEvents,
} from "../controllers/events.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", doEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.delete("/", deleteAllEvents);

export default router;
