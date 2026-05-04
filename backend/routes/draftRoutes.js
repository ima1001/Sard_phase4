const express = require("express");
const multer = require("multer");
const Draft = require("../models/Draft");

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Get all drafts
router.get("/", async (req, res) => {
    const drafts = await Draft.find();
    res.json(drafts);
});

// Upload draft
router.post("/upload/:projectId/:draftNumber", upload.single("pdf"), async (req, res) => {
    try {
        const draft = new Draft({
            fileUrl: req.file.path,
            draftNumber: req.params.draftNumber,
            projectId: req.params.projectId
        });

        const saved = await draft.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to upload draft" });
    }
});

// GET drafts by project
router.get("/:projectId", async (req, res) => {
    const drafts = await Draft.find({ projectId: req.params.projectId });
    res.json(drafts);
});
module.exports = router;