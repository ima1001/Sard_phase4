const express = require("express");
const router = express.Router();
const Community = require("../models/community.model.js");

//Create a new community
router.post("/", async (req, res) => {
  try {
    const { name="", description="" } = req.body||{};
    const created = await Community.create({ 
        name: name.trim(),
        description: description.trim()
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message||"create failed" });
  }
});

//Get all communities
router.get("/api/communities", async (req, res) => {
  try {
    const communities = await Community.find().sort({ createdAt: -1 });
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get a specific community
router.get("/api/communities/:id", async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) return res.status(404).json( {message: "Community not found"});
        res.json(community);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a community
router.put("api/communities/:id", async (req, res) => {
    try {
        const { name="", description="" } = req.body||{};
        const updated = await Community.findByIdAndUpdate(
            req.params.id,
            { name: name.trim(), description: description.trim() },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Community not found" });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

//Delete a community
router.delete("/api/communities/:id", async (req, res) => {
    try {
        const deleted = await Community.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Community not found" });
        res.json({ message: "Community deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;