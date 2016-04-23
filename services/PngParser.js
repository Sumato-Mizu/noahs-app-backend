"use strict";

const fs = require("fs");
const PNG = require('pngjs').PNG;

const config = require("../config/fmi");

class PngParser {
  constructor(options) {
    this.path = options.fmi;
  }
  readPngFile() {
    fs.createReadStream('./data/L41R.png')
      .pipe(new PNG({
        filterType: 4
      }))
      .on('parsed', function() {

        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];

            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }

        this.pack().pipe(fs.createWriteStream('out.png'));
      });
  }
}

module.exports = new PngParser(config);
