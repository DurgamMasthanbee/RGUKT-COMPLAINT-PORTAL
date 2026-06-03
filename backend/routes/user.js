import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const rguktEmailRegex = /^[oO][0-9]+@rgukt\.ac\.in$/;


// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullName, studentId, email, password } = req.body;

    // 🔍 VALIDATION
    if (!fullName || !studentId || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!rguktEmailRegex.test(email)) {
      return res.status(400).json({ message: "Only official RGUKT email IDs are allowed (Example: O210535@rgukt.ac.in)" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      studentId,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    if (!rguktEmailRegex.test(email)) {
      return res.status(400).json({ message: "Only official RGUKT email IDs are allowed (Example: O210535@rgukt.ac.in)" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET CURRENT USER (FOR PROFILE)
router.get("/me", async (req, res) => {
  try {
    const email = req.query.email?.toLowerCase().trim();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE USER PROFILE
router.put("/update/:id", async (req, res) => {
  try {
    const { fullName, studentId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        studentId,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;