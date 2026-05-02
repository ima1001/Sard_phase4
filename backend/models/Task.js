const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, default: "Proposed" },
    deadline: { type: String, required: true },
    author: { type: String, required: true },
    lastUpdate: { type: String, default: new Date().toISOString().split("T")[0] }
});

module.exports = mongoose.model("Task", taskSchema);
