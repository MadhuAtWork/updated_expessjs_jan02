const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  img: { type: String },
  title: { type: String },
  price: { type: String },
});

const Addcarts = mongoose.model("addcarts", taskSchema);

module.exports = Addcarts;
