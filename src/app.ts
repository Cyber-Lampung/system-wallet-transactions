import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

const app = express();

const limiter = {
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // Limit each IP to 100 requests per windowMs
  message: "To Many Request, plaease try againt later",
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable the legacy X-RateLimit-* headers
};

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// import routes
import userRoute from "./routes/user.routes.js";
import payment from "./routes/payment.routes.js";

app.use("/api", userRoute);
app.use("/api", payment);

export default app;
