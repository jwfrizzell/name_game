const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes.js");

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log("Listening Port: ", port);
