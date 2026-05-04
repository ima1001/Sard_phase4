const express = require("express");
const Task = require("../models/Task.js");

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add new task
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        const saved = await task.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// GET tasks by project
router.get("/:projectId", async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
});

module.exports = router;