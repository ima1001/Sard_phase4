import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, default: "Proposed" },
    deadline: { type: String, required: true },
    author: { type: String, required: true },
    lastUpdate: { type: String, default: new Date().toISOString().split("T")[0] }
});

export default mongoose.model("Task", taskSchema);
