const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Get all projects for a community
router.get("/:communityId", async (req, res) => {
    try {
        const projects = await Project.find({ communityId: req.params.communityId });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// Create a new project inside a community
router.post("/", async (req, res) => {
    try {
        const project = new Project(req.body);
        const saved = await project.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to create project" });
    }
});

module.exports = router;