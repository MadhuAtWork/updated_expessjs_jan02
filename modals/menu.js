const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  menu: { type: String, required: true },
  path: { type: String, required: true },
});

const Taskmenu = mongoose.model("menus", taskSchema);

module.exports = Taskmenu;
