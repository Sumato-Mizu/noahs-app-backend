"use strict";

const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true
});
const dir = __dirname + '/../images'

class ImageConverter {
  constructor(options) {}

  convert(imageName) {
    var imagePath = dir + "/" + imageName;
    var out = imagePath + ".png";

    // this.convertToPng(imagePath, out);
    // this.convertToColor(out, out);

    this.convertToPng(imagePath, out)
      .then(() => this.convertToColor(out, out));

  }

  convertToPng(imagePath, out) {
    // var imagePath = dir + "/" + imageName;
    // var out = imagePath + ".png";
    return new Promise((resolve, reject) => {
      gm(imagePath)
        .fill("white")
        .opaque("black")
        .colors(255)
        .transparent("white")
        // .fuzz(38)
        // .fill("cyan")
        // .opaque("rgb(0,0,0)")
        .write(out, err => {
          if (err) {
            console.log("error");
            // return console.dir(err);
            reject(err);
          } else {
            console.log("converted image to png");
            resolve();
          }
          // console.log(this.outname + " created  ::  " + arguments[3]);
          //require('child_process').exec('open ' + out)

        });
    })

  }

  convertToColor(imagePath, out) { // adds colors, overwrites old image
    // var imagePath = dir + "/" + imageName;
    // var out = imagePath;
    var color_idx = 0;
    var colors = ["cyan", "blue", "lime", "yellow", "orange", "red"];
    for (var i = 0; i < 160; i += 28) {
      console.log(colors);
      gm(imagePath)
        .fuzz(38)
        .fill(colors[color_idx])
        .opaque("rgb(" + i + ", " + i + ", " + i + ")")
        .write(out, err => {
          if (err) {
            console.dir(err);
            // return console.dir(err);
          }
          console.log(out + " added " + colors[color_idx]);
          //require('child_process').exec('open ' + out)

        });
      color_idx++;
    }
  }
}

module.exports = new ImageConverter();
