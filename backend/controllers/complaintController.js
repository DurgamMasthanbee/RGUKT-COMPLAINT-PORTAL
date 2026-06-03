import Complaint from "../models/Complaint.js";
import sendEmail from "../utils/sendEmail.js";
import { v4 as uuidv4 } from "uuid";

// ✅ CREATE COMPLAINT + EMAIL
export const createComplaint = async (req, res) => {
  try {
    const complaintId = "RGUKT-" + uuidv4().slice(0, 8).toUpperCase();

    const complaint = await Complaint.create({
      ...req.body,
      complaintId,
    });

    // 📧 SEND EMAIL TO ADMIN
    await sendEmail(
  process.env.ADMIN_EMAIL, // ✅ FIX
  "🚨 New Complaint Raised",
  `New Complaint Details:

Complaint ID: ${complaintId}
Name: ${complaint.name}
Email: ${complaint.email}
Title: ${complaint.title}
Description: ${complaint.description}
Priority: ${complaint.priority}
`
);

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaintId,
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating complaint",
      error: error.message,
    });
  }
};

// ✅ GET ALL or USER-SPECIFIC COMPLAINTS
export const getComplaints = async (req, res) => {
  try {
    const { email } = req.query;

    let complaints;

    if (email) {
      complaints = await Complaint.find({ email }).sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find().sort({ createdAt: -1 });
    }

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE COMPLAINT (TRACK)
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      complaintId: req.params.id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE STATUS + RESPONSE MESSAGE
export const updateComplaint = async (req, res) => {
  try {
    const { status, responseMessage } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status,
        responseMessage,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({
      message: "Complaint updated successfully",
      updated,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};