import express from "express";
import {
  getAllUsers,
  getUser,
  doUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", doUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);

export default router;
