const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    title: { type: String, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);