import express from "express";
import {
  loginUser,
  signupUser,
  getUserInfo,
  updateUser,
} from "../controllers/authController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/user", isAuthorized, getUserInfo);

router.patch("/user", isAuthorized, updateUser);

export default router;
