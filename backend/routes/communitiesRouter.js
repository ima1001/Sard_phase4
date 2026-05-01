import { Community } from "./models/Communities.model.js";
import express from "express";

const router = express.Router();

//Create a new community
router.post("/api/communities", async (req, res) => {
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