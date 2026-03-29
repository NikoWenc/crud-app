import { Router } from "express";
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getUserById,
  getUsersByName,
} from "../controllers/userControllers.js";

const router = Router();

// Example route
router.get("/users", getUsers);
router.get("/users/:username", getUsersByName);
router.get("/users/:id", getUserById);
router.post("/users", addUser);
router.put("/users/:id", editUser);
router.delete("/users/:id", deleteUser);

export default router;
