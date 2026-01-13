import express from "express";
import { ROLES } from "../constants/index.js";
import { restrictToRole } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

const adminRestrictMiddleware = restrictToRole(ROLES.ADMIN);

router.get("/users", adminRestrictMiddleware, getAllUsers);

export default router;
