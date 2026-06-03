import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String, // ✅ ADD THIS
  email: String,
  password: String
});


export default mongoose.model("Admin", adminSchema);
