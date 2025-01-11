// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["completed", "pending"], default: "pending" },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
