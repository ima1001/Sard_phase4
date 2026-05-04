const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    draftNumber: { type: Number, required: true },
    projectId:   { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Draft", draftSchema);