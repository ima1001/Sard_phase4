const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    numAuthors: { type: Number, required: true },
    accessibility: { type: String, required: true },
    communityNames: { type: mongoose.Schema.Types.ObjectId},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);