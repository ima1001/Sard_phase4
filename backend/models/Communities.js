const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  description:    { type: String}, 
  members: {type: Number, default: 0}
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);