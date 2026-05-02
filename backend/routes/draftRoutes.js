const express = require("express");
const multer = require("multer");
const path = require("path");
const Draft = require("../models/Draft");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `draft_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });


router.post("/upload/:bookId/:index", upload.single("pdf"), async (req, res) => {
    const { bookId, index } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    try {
        const draft = await Draft.findOneAndUpdate(
        { bookId, draftIndex: index },
        { fileUrl },
        { upsert: true, new: true }
        );

        res.json({
        message: "PDF uploaded successfully",
        draft
        });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});


router.get("/:bookId", async (req, res) => {
    const drafts = await Draft.find({ bookId: req.params.bookId });
    res.json(drafts);
});

module.exports = router;