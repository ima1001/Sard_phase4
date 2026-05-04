const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    numAuthors: { type: Number, required: true },
    accessibility: { type: String, required: true },
    communityNames: [{ type: String}],
    members: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role:   { type: String }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);