const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8088;

const logger = require("morgan");
app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());

const routes = require("./controllers/routes");

app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App is listening on port ${port}`);
  }
});

module.exports = app;
