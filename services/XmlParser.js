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
    fs.readFile("data/fmitestquery.xml", (err, data) => {
      parser.parseString(data, (err, result) => {
        this.traverseAndFindTifLinks(result)
      });
    });
  }
  readTifsFromXml(xml) {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      parser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const tifs = this.traverseAndFindTifLinks(result)
          console.log("Tifs found! Size: " + tifs.length);
          resolve(tifs)
        }
      })
    })
  }
  traverseAndFindTifLinks(o) {
    var tifArray = []
    for (var i in o) {
      if (typeof(o[i]) == "object") {
        tifArray.push(...this.traverseAndFindTifLinks(o[i]));
      } else {
        if (typeof o[i] === "string" && o[i].indexOf("http://wms.fmi.fi/fmi-apikey/") !== -1) {
          tifArray.push(o[i]);
        }
      }
    }
    return tifArray;
  }
}

module.exports = new XmlParser(config);
