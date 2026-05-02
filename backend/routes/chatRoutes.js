const express = require("express");
const router = express.Router();
const Message = require("../models/message.model.js");

//Create a new message
router.post("/", async (req, res) => {
  try {
    const { content="", sender="", senderName="", senderRole="", chatRoom="", fileUrl=null, fileType=null, fileName=null, projectId=null } = req.body||{};
    const created = await Message.create({ 
        content: content.trim(),
        sender: sender.trim(),
        senderName: senderName.trim(),
        senderRole: senderRole.trim(),
        chatRoom: chatRoom.trim(),
        fileUrl: fileUrl,
        fileType: fileType,
        fileName: fileName,
        projectId: projectId
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message||"create failed" });
  }
});

//Get all messages
router.get("/all", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get a specific message
router.get("/:id", async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json( {message: "Message not found"});
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;