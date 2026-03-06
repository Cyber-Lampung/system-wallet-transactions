import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

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
