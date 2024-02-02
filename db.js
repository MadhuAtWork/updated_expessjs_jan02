// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/admin");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("disconnected", () => console.log("MongoDB disconnected"));
db.on("reconnected", () => console.log("MongoDB reconnected"));
db.on("close", () => console.log("MongoDB connection closed"));
db.once("open", () => console.log("Connected to MongoDB"));

module.exports = mongoose;
