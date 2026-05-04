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
            accessibility: req.body.accessibility,
            communityNames: req.body.communityNames || [],
            createdBy: req.body.createdBy,
            members: []
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

// Update Project
router.put("/:id", async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                numAuthors: req.body.numAuthors,
                accessibility: req.body.accessibility,
                communityNames: req.body.communityNames
            },
            { new: true } 
        );

        res.json(updated);
    } catch (err) {
        console.error("Project update error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Join a project
router.post("/:id/join", async (req, res) => {
    try {
        const { userId, role } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $push: { members: { userId, role } } },
            { new: true }
        );
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get projects by user
router.get("/by-user/:userId", async (req, res) => {
    try {
        const projects = await Project.find({ 
            $or: [
                { "members.userId": req.params.userId },
                { createdBy: req.params.userId }
            ]
         });
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
module.exports = router;