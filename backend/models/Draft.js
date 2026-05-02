const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    draftIndex: { type: Number, required: true }, 
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Draft", draftSchema);