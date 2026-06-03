import express from "express";
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// ✅ CREATE COMPLAINT
router.post("/", createComplaint);

// ✅ GET ALL OR USER COMPLAINTS
router.get("/", getComplaints);

// ✅ TRACK COMPLAINT
router.get("/:id", getComplaintById);

// ✅ UPDATE STATUS (ADMIN)
router.put("/:id", updateComplaint);

export default router;