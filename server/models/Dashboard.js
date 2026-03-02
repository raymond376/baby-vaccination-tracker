const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    babyName: { type: String, default: "" },
    babyDob: { type: String, default: "" },
    isPregnant: { type: Boolean, default: false },
    vaccCompleted: { type: Map, of: Boolean, default: {} },
    milestonesDone: { type: Map, of: Boolean, default: {} },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dashboard", dashboardSchema);
