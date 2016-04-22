"use strict";

const config = require("../config/fmi");

class XmlParser {
  constructor(options) {
    this.path = options.fmi;
  }
}

module.exports = new XmlParser(config);
