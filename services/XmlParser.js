"use strict";

const fs = require("fs");
const xml2js = require("xml2js");

const config = require("../config/fmi");

class XmlParser {
  constructor(options) {
    this.path = options.fmi;
  }
  readXmlFile() {
    const parser = new xml2js.Parser();
    fs.readFile(__dirname + "/wfs.xml", (err, data) => {
      // console.log(data);
      parser.parseString(data, (err, result) => {
        console.dir(result);
        console.log("Done");
      });
    });
  }
}

module.exports = new XmlParser(config);
