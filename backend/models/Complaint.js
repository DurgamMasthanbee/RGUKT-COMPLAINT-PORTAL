import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaintId: { type: String, unique: true }, // ✅ ADD THIS

    name: String,
    roll: String,
    email: String,
    department: String,
    category: String,
    priority: String,
    location: String,
    title: String,
    description: String,
    anonymous: Boolean,

    status: {
      type: String,
      default: "Pending",
    },

    responseMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);