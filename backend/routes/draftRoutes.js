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
router.post("/upload/:draftNumber", upload.single("pdf"), async (req, res) => {
    try {
        const draft = new Draft({
            fileUrl: req.file.path,
            draftNumber: req.params.draftNumber
        });

        const saved = await draft.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Failed to upload draft" });
    }
});

module.exports = router;