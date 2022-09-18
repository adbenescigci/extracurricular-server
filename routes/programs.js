import express from "express";
import {
  getAllPrograms,
  getProgram,
  doProgram,
  updateProgram,
  deleteProgram,
  deleteAllPrograms,
} from "../controllers/programs.js";

const router = express.Router();

router.get("/", getAllPrograms);
router.get("/:id", getProgram);
router.post("/", doProgram);
router.patch("/:id", updateProgram);
router.delete("/:id", deleteProgram);
router.delete("/", deleteAllPrograms);

export default router;
