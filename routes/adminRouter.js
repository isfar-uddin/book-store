import express from "express";
import { ROLES } from "../constants/index.js";
import { restrictToRole } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

const adminRestrictMiddleware = restrictToRole(ROLES.ADMIN);

router.use(adminRestrictMiddleware);

router.get("/users", getAllUsers);

export default router;
