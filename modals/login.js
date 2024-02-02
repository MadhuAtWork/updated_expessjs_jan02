const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  captcha: { type: String },
});

const Tasklogin = mongoose.model("userdatas", taskSchema);

module.exports = Tasklogin;
