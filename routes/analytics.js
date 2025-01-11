const express = require("express");
const router = express.Router();
const Session = require("../models/Session");


router.get("/", async (req, res) => {
  try {
    const totalSessions = await Session.countDocuments(); 
    const clientProgress = await Session.aggregate([
      { $group: { _id: "$clientId", completedSessions: { $sum: "$completed" }, totalSessions: { $sum: 1 } } },
      { $project: { clientId: "$_id", completedSessions: 1, totalSessions: 1, progress: { $concat: [ { $toString: { $divide: [ "$completedSessions", "$totalSessions" ] } }, "%" ] } } },
    ]);

    res.status(200).json({ totalSessions, clientProgress });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics data", error: error.message });
  }
});

module.exports = router;
