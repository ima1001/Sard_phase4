const express = require("express");
const Task = require("../models/Task.js");

const router = express.Router();

// GET tasks by projectId
router.get("/", async (req, res) => {
    const { projectId } = req.query;

    if (!projectId) {
        return res.status(400).json({ error: "projectId is required" });
    }

    const tasks = await Task.find({ projectId });
    res.json(tasks);
});

// POST new task
router.post("/", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const saved = await newTask.save();
        res.json({ task: saved });
    } catch (err) {
        res.status(500).json({ error: "Failed to add task" });
    }
});


module.exports = router;