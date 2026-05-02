const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content:    { type: String, default: "" },
  sender:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true },
  chatRoom:   { type: String, required: true },
  fileUrl:    { type: String, default: null },
  fileType:   { type: String, default: null },
  fileName:   { type: String, default: null },
  projectId:  { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);