import { Router } from "express";
import {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getUserById,
  getUsersByName,
} from "../controllers/userControllers.js";
import { body, validationResult } from "express-validator";

const router = Router();

// Example route
router.get("/users", getUsers);
router.get("/users/search/:username", getUsersByName);
router.get("/users/:id", getUserById);
router.post(
  "/users",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("Username must be between 2 and 100 characters long"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addUser,
);

router.put(
  "/users/:id",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("Username must be between 2 and 100 characters long"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  editUser,
);

router.delete("/users/:id", deleteUser);

export default router;
