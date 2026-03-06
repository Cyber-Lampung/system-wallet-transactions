import express from "express";
import {
  userLoginControllers,
  userRegisterControllers,
} from "../controllers/auth/user.controller.js";
import { limiter } from "../utils/limiter.js";

const router = express.Router();

router.get("/users/check", (req, res, next) => {
  return res.status(200).json({ status: true, message: "server is alive" });
});

router.post("/users/register", limiter, userRegisterControllers);

router.post("/users/login", limiter, userLoginControllers);

export default router;
