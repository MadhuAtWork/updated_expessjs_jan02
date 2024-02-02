const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  img: { type: String },
  title: { type: String },
  price: { type: String },
});

const Images = mongoose.model("images", taskSchema);

module.exports = Images;
