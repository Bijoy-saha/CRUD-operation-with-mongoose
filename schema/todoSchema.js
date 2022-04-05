const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
  },
  status: {
    type: "string",
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports =todoSchema;