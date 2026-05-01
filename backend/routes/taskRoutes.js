import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post("/", async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json({ message: "Task added", task: newTask });
});

export default router;
