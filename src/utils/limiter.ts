import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 5, // Limit each IP to 100 requests per windowMs
  message: {
    response: {
      status: false,
      message: "To Many Request, plaease try againt later",
    },
  },
  standardHeaders: true, // Return rate limit info in standard headers
  legacyHeaders: false, // Disable the legacy X-RateLimit-* headers
});
