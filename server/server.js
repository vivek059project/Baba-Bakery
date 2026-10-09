import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns";

import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// --------------------------------------------------
// DNS configuration
// --------------------------------------------------
// MongoDB Atlas SRV lookup was failing through the
// local Node DNS resolver, so we explicitly use
// Cloudflare DNS here.
dns.setServers(["1.1.1.1", "1.0.0.1"]);

// --------------------------------------------------
// Express app
// --------------------------------------------------

const app = express();

const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// Database
// --------------------------------------------------

connectDB();

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Baba Bakery backend is running",
  });
});

// --------------------------------------------------
// Order routes
// --------------------------------------------------

app.use("/api/orders", orderRoutes);

// --------------------------------------------------
// 404 handler
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(
    `Baba Bakery backend running on http://localhost:${PORT}`
  );
});