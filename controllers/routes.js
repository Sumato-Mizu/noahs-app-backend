"use strict";

const express = require("express");
const router = new express.Router();

const fmiCtrl = require("./xml");
const radarCtrl = require("./radar")
const imageCtrl = require("./imageController")

router.get("/", (req, res) => {
  res.json({
    "message": "Sup guys."
  });
});

router.get("/xml", fmiCtrl.parseXml);
router.get("/png", fmiCtrl.parsePng);
router.post("/radar", radarCtrl.getXML);
router.get("/convertImage/:imageName", imageCtrl.convertImage)


module.exports = router;
