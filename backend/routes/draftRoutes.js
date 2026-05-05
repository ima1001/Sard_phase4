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
        const { projectId, draftNumber } = req.params;
        const draft = await Draft.findOneAndUpdate(
            { projectId, draftNumber },
            { fileUrl: req.file.path },
            { new: true, upsert: true }
        );

        res.json(draft);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to upload draft" });
    }
});


// GET drafts by project
router.get("/:projectId", async (req, res) => {
    const drafts = await Draft.find({ projectId: req.params.projectId });
    res.json(drafts);
});
module.exports = router;