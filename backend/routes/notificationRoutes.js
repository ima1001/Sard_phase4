const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// Create notification
router.post("/", async (req, res) => {
  try {
    const { title, message, type, projectId } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      projectId: type === "project" ? projectId : null,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification", error });
  }
});

// Get general notifications
router.get("/general", async (req, res) => {
  try {
    const notifications = await Notification.find({
      type: "general",
      isRead: false,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notifications", error });
  }
});

// Get project-specific notifications
router.get("/project/:projectId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      type: "project",
      projectId: req.params.projectId,
      isRead: false,
      status: "pending",
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to get project notifications", error });
  }
});

// Mark general notification as read
router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification", error });
  }
});

// Accept or reject project notification
router.patch("/:id/respond", async (req, res) => {
  try {
    const { action } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        status: action,
        isRead: true,
      },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Failed to respond to notification", error });
  }
});

module.exports = router;