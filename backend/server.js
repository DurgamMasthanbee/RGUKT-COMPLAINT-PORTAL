import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

import Admin from "./models/Admin.js";

dotenv.config();

const app = express();

// ✅ CONNECT DB + CREATE ADMIN
connectDB().then(async () => {
  try {
    const existing = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

      await Admin.create({
        name: "Masthanbee Durgam",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      console.log("✅ Admin created");
    }
  } catch (err) {
    console.log(err);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);

// Test
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});