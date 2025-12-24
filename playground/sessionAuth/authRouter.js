import express from "express";
import { loginUser, getUserInfo, updateUser } from "./authController.js";
import { isAuthorized } from "./authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/user", isAuthorized, getUserInfo);

router.patch("/user", isAuthorized, updateUser);

export default router;
