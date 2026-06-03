import express from "express";
import Admin from "../models/Admin.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;