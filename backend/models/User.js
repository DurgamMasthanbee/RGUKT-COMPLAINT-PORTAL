import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  studentId: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
});

export default mongoose.model("User", userSchema);