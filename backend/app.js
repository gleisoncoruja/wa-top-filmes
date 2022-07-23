require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.API_PORT;

const app = express();

// config JSON and data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory - in our case actual dir + /uploads
app.use("/views", express.static(path.join(__dirname, "views")));

// DB connection
require("./config/db.js");

// routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
