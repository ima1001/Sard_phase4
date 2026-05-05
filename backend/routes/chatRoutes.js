const express = require("express");
const router = express.Router();
const multer = require("multer");
const Message = require("../models/message.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// GET messages for a specific project + chatRoom
router.get("/:projectId/:chatRoom", async (req, res) => {
  try {
    const messages = await Message.find({
      projectId: req.params.projectId,
      chatRoom: req.params.chatRoom
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST text message
router.post("/", async (req, res) => {
  try {
    const { content, sender, senderName, senderRole, chatRoom, projectId } = req.body;
    const message = await Message.create({
      content, sender, senderName, senderRole, chatRoom, projectId
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST file message
router.post("/file", upload.single("file"), async (req, res) => {
  try {
    const { sender, senderName, senderRole, chatRoom, projectId } = req.body;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const message = await Message.create({
      sender, senderName, senderRole, chatRoom, projectId,
      fileUrl,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE message
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;