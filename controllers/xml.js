"use strict";

const XmlParser = require("../services/XmlParser");
const PngParser = require("../services/PngParser");

module.exports.parseXml = (req, res) => {
  res.send({
    message: "Im parsing stuff!",
  });
  XmlParser.readXmlFile();
};

module.exports.parsePng = (req, res) => {
  res.send({
    message: "Im parsing png!",
  });
  PngParser.readPngFile();
};
