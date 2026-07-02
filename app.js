require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const dbconnect = require("./dbConfiguration/dbConfig");
dbconnect();
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
