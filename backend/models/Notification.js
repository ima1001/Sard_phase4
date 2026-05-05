const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["general", "project"],
      required: true,
    },

    projectId: {
      type: String,
      default: null,
    },

    senderId:   { 
      type: String, 
      default: null 
    },

    senderRole: { 
      type: String,
      default: null 
    }, 

    status: {
      type: String,
      enum: ["pending", "accept", "reject"],
      default: "pending",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);