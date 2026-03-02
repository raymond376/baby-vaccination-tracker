const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard");

// Create a new dashboard
router.post("/", async (req, res) => {
  try {
    const dashboard = new Dashboard(req.body);
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get dashboard by ID
router.get("/:id", async (req, res) => {
  try {
    const dashboard = await Dashboard.findById(req.params.id);
    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update dashboard by ID
router.put("/:id", async (req, res) => {
  try {
    const dashboard = await Dashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }
    res.json(dashboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete (reset) dashboard by ID
router.delete("/:id", async (req, res) => {
  try {
    const dashboard = await Dashboard.findByIdAndDelete(req.params.id);
    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }
    res.json({ message: "Dashboard reset successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
