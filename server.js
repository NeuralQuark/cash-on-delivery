const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const { wixClient } = require("./client");

const app = express();
app.use(express.text());

app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log(`${req.method} ${req.url}`);
  next();
});
//https://7311d7c1288a.ngrok-free.app
app.post("/v1/calculate-additional-fees", (req, res) => {
  wixClient.servicePlugins.process(req);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Additional Fees SPI running on port ${PORT}`);
});
