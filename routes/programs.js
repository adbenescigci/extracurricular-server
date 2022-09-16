import express from "express";
import {
  getAllPrograms,
  getProgram,
  doProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programs.js";

const router = express.Router();

router.get("/", getAllPrograms);
router.get("/:id", getProgram);
router.post("/", doProgram);
router.patch("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;
