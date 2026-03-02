import express from "express";
import userRegisterControllers from "../controllers/auth/user.controller.js";

const router = express.Router();

router.get("/users/check", (req, res, next) => {
  return res.status(200).json({ status: true, message: "server is alive" });
});

router.post("/users/register", userRegisterControllers);

export default router;
