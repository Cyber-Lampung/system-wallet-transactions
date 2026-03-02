import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  port: parseInt(process.env.DB_PORT || "4000"),
  database: process.env.DB_DB || "wallet",
  ssl: {
    rejectUnauthorized: false,
  },
  queueLimit: 0,
  connectionLimit: 10,
  timezone: "asia/jakarta",
});
