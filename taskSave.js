// models/task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  phonenumber: { type: String, required: true },
  fullname: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("tasksaves", taskSchema);

const taskSchemaDelete = new mongoose.Schema({
  name: { type: String },
  phonenumber: { type: String },
  fullname: { type: String },
  city: { type: String },
  state: { type: String },
  email: { type: String },
  completed: { type: Boolean, default: false },
});

const TaskDelete = mongoose.model("tasksave", taskSchemaDelete);

module.exports = { Task, TaskDelete };
