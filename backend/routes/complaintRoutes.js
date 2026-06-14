import express from "express";

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// ✅ CREATE COMPLAINT
import upload from "../middleware/upload.js";

router.post(
  "/",
  upload.array("attachments", 5),
  createComplaint
);

// ✅ GET ALL OR USER COMPLAINTS
router.get("/", getComplaints);

// ✅ TRACK COMPLAINT
router.get("/:id", getComplaintById);

// ✅ UPDATE STATUS (ADMIN)
router.put("/:id", updateComplaint);

// ✅ DELETE COMPLAINT
router.delete("/:id", deleteComplaint);

export default router;