"use strict";

const ImageConverter = require("../services/ImageConverter");

module.exports.convertImage = (req, res) => {
  res.send({
    message: "converting image",
  });
  ImageConverter.convert(req.params.imageName);
};
