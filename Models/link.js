const { date } = require("joi");
const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  urlId: { type: String, required: true },
  origUrl: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 },
  createdAt: { type: String, default: Date.now },
  lastVisited: { type: String },
});

module.exports = mongoose.model("Link", LinkSchema);
