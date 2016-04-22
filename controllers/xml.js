"use strict";

const XmlParser = require("../services/XmlParser");

module.exports.parseStuff = (req, res) => {
  res.send({
    message: "Im parsing stuff!",
  });
  XmlParser.readXmlFile();
};
