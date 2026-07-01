require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnect = require("./dbconfiguration/dbConfig");
const routes = require("./routes/index");
const app = express();
const port = process.env.port;
dbconnect();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
