import express from "express";
import cors from "cors";
import ordersRoutes from "./routes/orders.routes.js";
import { pool } from "./config/db.js";
import { redis } from "./config/redis.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", ordersRoutes);

// PostgreSQL test
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Postgres error:", err));

// Redis test
redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
