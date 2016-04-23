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
            // console.log(data);
            parser.parseString(data, (err, result) => {
                //        console.dir(result);
                this.traverseAndFindTifLinks(result)
                    //                console.log(JSON.stringify(result));
            });
        });
    }
    readXml(xml) {
        const parser = new xml2js.Parser();
        return new Promise((resolve, reject) => {
          parser.parseString(xml, (err, result) => {
            const tifs =  this.traverseAndFindTifLinks(result)
            console.log(tifs)
            resolve(tifs)
          })
        })
        return "vituiks meni"

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
