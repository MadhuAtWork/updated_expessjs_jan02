// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const mongoose = require("./db");
const routes = require("./router");

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());

app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
