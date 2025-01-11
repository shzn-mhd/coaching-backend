// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["completed", "pending"], default: "pending" },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);

app.post("/api/sessions", authMiddleware, async (req, res) => {
    const { coach, client, date } = req.body;
    const session = await Session.create({ coach, client, date });
    res.status(201).json(session);
  });
  
  app.get("/api/sessions/pending", authMiddleware, async (req, res) => {
    const sessions = await Session.find({
      client: req.user.id,
      status: "pending",
    });
    res.status(200).json(sessions);
  });

  
  app.patch("/api/sessions/:id/complete", authMiddleware, async (req, res) => {
    const session = await Session.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    res.status(200).json(session);
  });
  

  