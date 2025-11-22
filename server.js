import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Connect Cloudinary
await connectCloudinary();

// CORS must be before everything
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your Render frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => res.send("Server is Live!"));

// Protect only API routes
app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running in port", PORT);
});
