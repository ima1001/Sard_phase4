const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Create Project
router.post("/", async (req, res) => {
    try {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            numAuthors: req.body.numAuthors,
            accessibility: req.body.accessibility
        });

        res.json(project);
    } catch (err) {
        console.error("Project creation error:", err);
        res.status(500).json({ error: err.message });
    }
});


// Get all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single project
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get projects by community name
router.get("/by-community/:name", async (req, res) => {
    try {
        const projects = await Project.find({
            communityNames: req.params.name
        });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;