require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const cookie_parser = require("cookie-parser");
const seeddata = require("./data/seed");
const dbconnect = require("./dbConfiguration/dbConfig");
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(cookie_parser());
dbconnect().then(async () => {
  await seeddata();
});
app.use(routes);

app.get("/", (req, res) => {
  res.send("Nothing exist on this page");
});

app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
